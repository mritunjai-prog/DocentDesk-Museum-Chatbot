import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, X, Send, Sparkles, Ticket, Map, Info, Calendar, 
  Loader2, Bot, User, Mic, MicOff, Volume2, VolumeX, Camera,
  GripVertical, Minimize2, Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const quickActions = [
  { icon: Ticket, label: 'Book Tickets', prompt: 'How can I book tickets for the museum?' },
  { icon: Map, label: 'Virtual Tour', prompt: 'Tell me about the virtual tour experience' },
  { icon: Camera, label: 'Scan Artifact', prompt: 'How can I scan artifacts for more information?' },
  { icon: Info, label: 'Museum Info', prompt: 'What are the museum hours and admission prices?' },
  { icon: Calendar, label: 'Events', prompt: 'What events are happening at the museum this month?' },
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0 });
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && !isMinimized) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Voice recognition
  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: 'Not Supported',
        description: 'Voice input is not supported in your browser.',
        variant: 'destructive',
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: 'Voice Error',
        description: 'Could not recognize speech. Please try again.',
        variant: 'destructive',
      });
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  }, [toast]);

  // Text-to-speech
  const speakText = useCallback((text: string) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-drag-handle]')) {
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        offsetX: position.x,
        offsetY: position.y,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.offsetX + deltaX,
        y: dragRef.current.offsetY + deltaY,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const streamChat = async (userMessages: Message[]) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        throw new Error('Rate limited. Please wait a moment and try again.');
      }
      if (resp.status === 402) {
        throw new Error('Service temporarily unavailable. Please try again later.');
      }
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to get response');
    }

    return resp;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const response = await streamChat(updatedMessages);
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let textBuffer = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content;
            if (deltaContent) {
              assistantContent += deltaContent;
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage?.role === 'assistant') {
                  lastMessage.content = assistantContent;
                }
                return newMessages;
              });
            }
          } catch {
            // Incomplete JSON, continue
          }
        }
      }

      // Speak the response
      if (assistantContent && ttsEnabled) {
        speakText(assistantContent);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Chat Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive',
      });
      setMessages((prev) => prev.filter((m) => m.content !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button with pulse animation */}
      <Button
        data-chatbot-trigger
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300',
          'bg-gradient-gold hover:scale-110 glow-gold',
          'before:absolute before:inset-0 before:rounded-full before:bg-gold/30 before:animate-ping',
          isOpen && 'scale-0 opacity-0'
        )}
      >
        <MessageCircle className="w-7 h-7 text-primary-foreground relative z-10" />
      </Button>

      {/* Chat panel */}
      <div
        ref={panelRef}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className={cn(
          'fixed bottom-6 right-6 z-50 transition-all duration-300 origin-bottom-right',
          isMinimized ? 'w-72 h-16' : 'w-[400px] max-w-[calc(100vw-48px)]',
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none',
          isDragging && 'cursor-grabbing'
        )}
      >
        <div className={cn(
          'glass-card overflow-hidden flex flex-col',
          isMinimized ? 'h-16' : 'h-[650px] max-h-[calc(100vh-100px)]'
        )}>
          {/* Header with drag handle */}
          <div 
            data-drag-handle
            className="p-4 border-b border-border bg-gradient-to-r from-gold/10 to-teal/10 cursor-grab flex-shrink-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center relative">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                    {isSpeaking && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-foreground">DocentDesk AI</h3>
                  <p className="text-xs text-muted-foreground">
                    {isLoading ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Your Museum Guide'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={cn(
                    'text-muted-foreground hover:text-foreground',
                    ttsEnabled && 'text-gold'
                  )}
                  title={ttsEnabled ? 'Disable voice' : 'Enable voice'}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false);
                    window.speechSynthesis.cancel();
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <ScrollArea ref={scrollRef} className="flex-1 p-4">
                {messages.length === 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-gold" />
                      </div>
                      <div className="glass p-3 rounded-xl rounded-tl-sm max-w-[85%]">
                        <p className="text-sm text-foreground">
                          Welcome to DocentDesk! I'm your AI museum guide. I can help you:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>🎫 Book tickets and check prices</li>
                          <li>🗺️ Navigate the virtual tour</li>
                          <li>📸 Learn about artifacts</li>
                          <li>🎉 Discover events and exhibitions</li>
                        </ul>
                        <p className="text-sm text-foreground mt-2">
                          How can I help you explore today?
                        </p>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {quickActions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.prompt)}
                          className="flex items-center gap-2 p-3 rounded-lg glass hover:bg-secondary/50 transition-colors text-left group"
                        >
                          <action.icon className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-foreground">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex items-start gap-3 animate-fade-in',
                          message.role === 'user' && 'flex-row-reverse'
                        )}
                      >
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                            message.role === 'assistant' ? 'bg-gold/20' : 'bg-teal/20'
                          )}
                        >
                          {message.role === 'assistant' ? (
                            <Bot className="w-4 h-4 text-gold" />
                          ) : (
                            <User className="w-4 h-4 text-teal" />
                          )}
                        </div>
                        <div
                          className={cn(
                            'p-3 rounded-xl max-w-[85%]',
                            message.role === 'assistant'
                              ? 'glass rounded-tl-sm'
                              : 'bg-teal/20 rounded-tr-sm'
                          )}
                        >
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {message.content || (
                              <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Thinking...
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Input with voice */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border flex-shrink-0">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={startListening}
                    disabled={isLoading}
                    className={cn(
                      'flex-shrink-0',
                      isListening && 'bg-destructive/20 text-destructive animate-pulse'
                    )}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? 'Listening...' : 'Ask about exhibits, tickets, tours...'}
                    className="flex-1 bg-secondary/50 border-border focus:border-gold"
                    disabled={isLoading || isListening}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-gold hover:opacity-90 text-primary-foreground flex-shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
