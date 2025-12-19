import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import User from "../models/User.model.js";
import Artifact from "../models/Artifact.model.js";
import Event from "../models/Event.model.js";
import Feedback from "../models/Feedback.model.js";

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seed...".yellow.bold);

    // Clear existing data and drop collections to reset indexes
    try {
      await mongoose.connection.dropCollection("users");
      await mongoose.connection.dropCollection("artifacts");
      await mongoose.connection.dropCollection("events");
      await mongoose.connection.dropCollection("feedbacks");
    } catch (error) {
      // Collections may not exist yet
      console.log(
        "⚠️  Some collections didn't exist (this is ok for first run)".yellow
      );
    }
    console.log("✅ Cleared existing data".green);

    // Create admin user
    const adminUser = await User.create({
      email: "admin@docentdesk.com",
      password: "admin123456",
      name: "Admin User",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      authProvider: "local",
      isEmailVerified: true,
      language: "en",
    });
    console.log("✅ Created admin user".green);

    // Create sample users
    const users = await User.create([
      {
        email: "user1@example.com",
        password: "password123",
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        role: "user",
        authProvider: "local",
        isEmailVerified: true,
        language: "en",
      },
      {
        email: "user2@example.com",
        password: "password123",
        name: "Jane Smith",
        firstName: "Jane",
        lastName: "Smith",
        role: "user",
        authProvider: "local",
        isEmailVerified: true,
        language: "fr",
      },
    ]);
    console.log("✅ Created sample users".green);

    // Create Egyptian artifacts
    const artifacts = await Artifact.create([
      {
        title: "Tutankhamun's Golden Mask",
        description:
          "The iconic funeral mask of the young pharaoh Tutankhamun, crafted from gold and precious stones. This masterpiece of ancient Egyptian art symbolizes the divine nature of kingship and the afterlife beliefs of ancient Egypt.",
        shortDescription: "The famous golden death mask of King Tutankhamun",
        category: "Sculpture",
        era: "New Kingdom",
        origin: "Valley of the Kings, Luxor",
        yearDiscovered: 1922,
        material: "Gold, lapis lazuli, carnelian, obsidian",
        dimensions: { height: 54, width: 39.3, depth: 49, unit: "cm" },
        imageUrl: "/images/artifacts/tutankhamun-mask.jpg",
        isFeatured: true,
        isPublished: true,
        viewCount: 1523,
        likeCount: 342,
        tags: ["pharaoh", "gold", "treasure", "new kingdom", "royalty"],
        curator: adminUser._id,
        position3D: { x: 0, y: 1.5, z: -5 },
      },
      {
        title: "Rosetta Stone",
        description:
          "A granodiorite stele inscribed with three versions of a decree issued in Memphis, Egypt in 196 BC. The top and middle texts are in Ancient Egyptian using hieroglyphic and Demotic scripts, while the bottom is in Ancient Greek. This stone was key to deciphering Egyptian hieroglyphs.",
        shortDescription: "The key to deciphering ancient Egyptian hieroglyphs",
        category: "Artifact",
        era: "Ptolemaic Period",
        origin: "Rosetta (Rashid), Egypt",
        yearDiscovered: 1799,
        material: "Granodiorite",
        dimensions: { height: 114, width: 72, depth: 28, unit: "cm" },
        imageUrl: "/images/artifacts/rosetta-stone.jpg",
        isFeatured: true,
        isPublished: true,
        viewCount: 2341,
        likeCount: 567,
        tags: ["hieroglyphs", "language", "ptolemaic", "inscription"],
        curator: adminUser._id,
        position3D: { x: -3, y: 1.5, z: -5 },
      },
      {
        title: "Nefertiti Bust",
        description:
          "A painted stucco-coated limestone bust of Nefertiti, the Great Royal Wife of Egyptian Pharaoh Akhenaten. One of the most copied works of ancient Egypt, it is renowned for exemplifying the understanding of ancient Egyptian art.",
        shortDescription: "Iconic limestone bust of Queen Nefertiti",
        category: "Sculpture",
        era: "New Kingdom",
        origin: "Amarna, Egypt",
        yearDiscovered: 1912,
        material: "Limestone, stucco",
        dimensions: { height: 47, width: 20, depth: 21, unit: "cm" },
        imageUrl: "/images/artifacts/nefertiti-bust.jpg",
        isFeatured: true,
        isPublished: true,
        viewCount: 1876,
        likeCount: 423,
        tags: ["queen", "sculpture", "amarna", "akhenaten", "beauty"],
        curator: adminUser._id,
        position3D: { x: 3, y: 1.5, z: -5 },
      },
      {
        title: "Canopic Jars Set",
        description:
          "A complete set of four canopic jars used during the mummification process to store and preserve the viscera of the deceased for the afterlife. Each jar is topped with a different protective deity: Imsety, Hapy, Duamutef, and Qebehsenuef.",
        shortDescription: "Four jars used to store organs during mummification",
        category: "Artifact",
        era: "New Kingdom",
        origin: "Thebes, Egypt",
        yearDiscovered: 1898,
        material: "Alabaster, painted",
        dimensions: { height: 38, width: 18, depth: 18, unit: "cm" },
        imageUrl: "/images/artifacts/canopic-jars.jpg",
        isFeatured: false,
        isPublished: true,
        viewCount: 876,
        likeCount: 156,
        tags: ["mummification", "afterlife", "deities", "funerary"],
        curator: adminUser._id,
        position3D: { x: -6, y: 1, z: -5 },
      },
      {
        title: "Book of the Dead Papyrus",
        description:
          "An ancient Egyptian funerary text consisting of magic spells intended to assist a dead person's journey through the underworld and into the afterlife. This particular scroll features beautifully illustrated vignettes and hieroglyphic text.",
        shortDescription: "Ancient Egyptian funerary text and spells",
        category: "Artifact",
        era: "New Kingdom",
        origin: "Thebes, Egypt",
        yearDiscovered: 1888,
        material: "Papyrus, ink, pigments",
        dimensions: { height: 37, width: 550, unit: "cm" },
        imageUrl: "/images/artifacts/book-of-dead.jpg",
        isFeatured: false,
        isPublished: true,
        viewCount: 1234,
        likeCount: 289,
        tags: ["papyrus", "spells", "afterlife", "hieroglyphs", "religious"],
        curator: adminUser._id,
        position3D: { x: 6, y: 1.2, z: -5 },
      },
      {
        title: "Anubis Statue",
        description:
          "A magnificent statue of Anubis, the jackal-headed god associated with mummification and the afterlife. This black-painted wooden statue shows the deity in a recumbent position, as traditionally depicted guarding tombs.",
        shortDescription: "Statue of Anubis, god of mummification",
        category: "Sculpture",
        era: "New Kingdom",
        origin: "Valley of the Kings, Luxor",
        yearDiscovered: 1922,
        material: "Wood, painted, gilded",
        dimensions: { height: 118, width: 52, depth: 27, unit: "cm" },
        imageUrl: "/images/artifacts/anubis-statue.jpg",
        isFeatured: true,
        isPublished: true,
        viewCount: 1456,
        likeCount: 334,
        tags: ["deity", "anubis", "afterlife", "jackal", "guardian"],
        curator: adminUser._id,
        position3D: { x: 0, y: 1, z: -8 },
      },
      {
        title: "Scarab Amulets Collection",
        description:
          "A collection of scarab beetle amulets carved from various semi-precious stones. Scarabs were popular in ancient Egypt as symbols of transformation, renewal, and protection. They were worn as jewelry and placed in tombs.",
        shortDescription: "Collection of protective scarab beetle amulets",
        category: "Jewelry",
        era: "Middle Kingdom",
        origin: "Various sites, Egypt",
        material: "Lapis lazuli, carnelian, turquoise, steatite",
        dimensions: { height: 2, width: 3, depth: 1, unit: "cm" },
        imageUrl: "/images/artifacts/scarab-amulets.jpg",
        isFeatured: false,
        isPublished: true,
        viewCount: 654,
        likeCount: 123,
        tags: ["jewelry", "amulet", "protection", "scarab", "gemstones"],
        curator: adminUser._id,
        position3D: { x: -4, y: 1, z: -8 },
      },
      {
        title: "Hieroglyphic Tablet",
        description:
          "A limestone tablet covered in hieroglyphic inscriptions detailing religious rituals and offerings to the gods. This piece provides valuable insights into ancient Egyptian religious practices and daily life.",
        shortDescription: "Limestone tablet with hieroglyphic inscriptions",
        category: "Artifact",
        era: "Old Kingdom",
        origin: "Saqqara, Egypt",
        yearDiscovered: 1856,
        material: "Limestone",
        dimensions: { height: 80, width: 50, depth: 10, unit: "cm" },
        imageUrl: "/images/artifacts/hieroglyphic-tablet.jpg",
        isFeatured: false,
        isPublished: true,
        viewCount: 543,
        likeCount: 98,
        tags: ["hieroglyphs", "religious", "inscription", "limestone"],
        curator: adminUser._id,
        position3D: { x: 4, y: 1.3, z: -8 },
      },
      {
        title: "Mummy Sarcophagus",
        description:
          "An intricately painted wooden sarcophagus from the Late Period, featuring colorful depictions of gods, protective symbols, and hieroglyphic texts to guide the deceased through the afterlife.",
        shortDescription: "Painted wooden coffin for mummy",
        category: "Artifact",
        era: "Late Period",
        origin: "Luxor, Egypt",
        yearDiscovered: 1905,
        material: "Wood, painted, gesso",
        dimensions: { height: 185, width: 60, depth: 55, unit: "cm" },
        imageUrl: "/images/artifacts/sarcophagus.jpg",
        isFeatured: true,
        isPublished: true,
        viewCount: 2103,
        likeCount: 478,
        tags: ["mummy", "coffin", "funerary", "painted", "afterlife"],
        curator: adminUser._id,
        position3D: { x: 0, y: 0.5, z: -11 },
      },
      {
        title: "Golden Ankh Necklace",
        description:
          "An exquisite gold necklace featuring the ankh symbol, representing life and immortality in ancient Egyptian culture. This piece was likely worn by nobility or royalty.",
        shortDescription: "Gold necklace with the symbol of life",
        category: "Jewelry",
        era: "New Kingdom",
        origin: "Thebes, Egypt",
        material: "Gold, precious stones",
        dimensions: { height: 8, width: 4, unit: "cm" },
        imageUrl: "/images/artifacts/ankh-necklace.jpg",
        isFeatured: false,
        isPublished: true,
        viewCount: 876,
        likeCount: 201,
        tags: ["jewelry", "gold", "ankh", "life", "royalty"],
        curator: adminUser._id,
        position3D: { x: -5, y: 1.2, z: -11 },
      },
      {
        title: "Shabti Figurines",
        description:
          "A set of small mummiform figurines placed in tombs to serve as servants for the deceased in the afterlife. These shabti would magically come to life to perform manual labor on behalf of the tomb owner.",
        shortDescription: "Servant figurines for the afterlife",
        category: "Sculpture",
        era: "New Kingdom",
        origin: "Valley of the Kings, Luxor",
        material: "Faience, wood",
        dimensions: { height: 15, width: 4, depth: 3, unit: "cm" },
        imageUrl: "/images/artifacts/shabti-figurines.jpg",
        isFeatured: false,
        isPublished: true,
        viewCount: 432,
        likeCount: 87,
        tags: ["funerary", "servants", "afterlife", "figurines"],
        curator: adminUser._id,
        position3D: { x: 5, y: 1, z: -11 },
      },
      {
        title: "Pharaoh's Throne",
        description:
          "A gilded ceremonial throne inlaid with semi-precious stones, showcasing the power and divine authority of the pharaoh. The throne features intricate carvings of protective deities and hieroglyphic inscriptions.",
        shortDescription: "Golden ceremonial throne of a pharaoh",
        category: "Artifact",
        era: "New Kingdom",
        origin: "Valley of the Kings, Luxor",
        yearDiscovered: 1922,
        material: "Wood, gold leaf, precious stones",
        dimensions: { height: 102, width: 54, depth: 60, unit: "cm" },
        imageUrl: "/images/artifacts/pharaoh-throne.jpg",
        isFeatured: true,
        isPublished: true,
        viewCount: 1789,
        likeCount: 412,
        tags: ["royalty", "throne", "gold", "pharaoh", "power"],
        curator: adminUser._id,
        position3D: { x: 0, y: 0.5, z: -14 },
      },
    ]);
    console.log("✅ Created 12 Egyptian artifacts".green);

    // Create events
    const events = await Event.create([
      {
        title: "Ancient Egypt: Life and Death",
        description:
          "Explore the mysteries of ancient Egyptian civilization through our comprehensive exhibition featuring mummies, sarcophagi, and funerary artifacts. Discover the elaborate burial practices and beliefs about the afterlife that defined this remarkable culture.",
        category: "Exhibition",
        date: new Date("2024-12-20"),
        endDate: new Date("2025-03-15"),
        time: "10:00 AM - 6:00 PM",
        duration: 480,
        location: "Main Gallery",
        venue: {
          name: "DocentDesk Museum",
          address: "123 Museum Street",
          city: "Cairo",
          country: "Egypt",
          coordinates: { latitude: 30.0444, longitude: 31.2357 },
        },
        imageUrl: "/images/events/egypt-exhibition.jpg",
        price: {
          adult: 150,
          child: 75,
          senior: 100,
          student: 80,
          currency: "EGP",
        },
        capacity: 200,
        availableSeats: 200,
        isFeatured: true,
        isPublished: true,
        highlights: [
          "Over 100 authentic artifacts",
          "Interactive mummification demonstration",
          "Hieroglyphics workshop",
          "Virtual reality tomb exploration",
        ],
        organizer: adminUser._id,
        tags: ["egypt", "exhibition", "mummies", "afterlife"],
      },
      {
        title: "Hieroglyphics 101: Introduction Workshop",
        description:
          "Learn to read and write ancient Egyptian hieroglyphs in this hands-on workshop. Our expert Egyptologists will guide you through the basics of this fascinating writing system.",
        category: "Workshop",
        date: new Date("2024-12-28"),
        time: "2:00 PM",
        duration: 120,
        location: "Education Center",
        venue: {
          name: "DocentDesk Museum",
          address: "123 Museum Street",
          city: "Cairo",
          country: "Egypt",
          coordinates: { latitude: 30.0444, longitude: 31.2357 },
        },
        imageUrl: "/images/events/hieroglyphics-workshop.jpg",
        price: {
          adult: 200,
          child: 150,
          senior: 150,
          student: 120,
          currency: "EGP",
        },
        capacity: 30,
        availableSeats: 30,
        isFeatured: true,
        isPublished: true,
        ageRestriction: { min: 12 },
        highlights: [
          "Learn basic hieroglyphic symbols",
          "Write your name in hieroglyphs",
          "Take home your own papyrus",
          "Certificate of completion",
        ],
        requirements: ["Notebook and pen", "Basic English literacy"],
        organizer: adminUser._id,
        tags: ["workshop", "hieroglyphs", "education", "writing"],
      },
      {
        title: "Tutankhamun's Treasure: A Guided Tour",
        description:
          "Join us for an exclusive guided tour focusing on the treasures of Tutankhamun, including his golden mask, jewelry, and funerary equipment. Learn about the discovery and significance of this incredible archaeological find.",
        category: "Tour",
        date: new Date("2024-12-22"),
        time: "11:00 AM",
        duration: 90,
        location: "Tutankhamun Gallery",
        venue: {
          name: "DocentDesk Museum",
          address: "123 Museum Street",
          city: "Cairo",
          country: "Egypt",
          coordinates: { latitude: 30.0444, longitude: 31.2357 },
        },
        imageUrl: "/images/events/tut-tour.jpg",
        price: {
          adult: 100,
          child: 50,
          senior: 75,
          student: 60,
          currency: "EGP",
        },
        capacity: 25,
        availableSeats: 25,
        isFeatured: false,
        isPublished: true,
        speakers: [
          {
            name: "Dr. Ahmed Hassan",
            title: "Chief Egyptologist",
            bio: "Leading expert in New Kingdom archaeology",
          },
        ],
        organizer: adminUser._id,
        tags: ["tour", "tutankhamun", "guided", "treasure"],
      },
      {
        title: "The Queens of Egypt Lecture Series",
        description:
          "A fascinating lecture series exploring the powerful women who shaped ancient Egypt, from Hatshepsut to Cleopatra. Each session focuses on a different queen and her contributions to Egyptian history.",
        category: "Lecture",
        date: new Date("2025-01-05"),
        endDate: new Date("2025-03-05"),
        time: "6:00 PM",
        duration: 90,
        location: "Auditorium",
        venue: {
          name: "DocentDesk Museum",
          address: "123 Museum Street",
          city: "Cairo",
          country: "Egypt",
          coordinates: { latitude: 30.0444, longitude: 31.2357 },
        },
        imageUrl: "/images/events/queens-lecture.jpg",
        price: {
          adult: 80,
          child: 40,
          senior: 60,
          student: 50,
          currency: "EGP",
        },
        capacity: 150,
        availableSeats: 150,
        isFeatured: true,
        isPublished: true,
        speakers: [
          {
            name: "Dr. Sarah Mohamed",
            title: "Egyptologist",
            bio: "Specialist in queens and female pharaohs",
          },
          {
            name: "Prof. Layla Ibrahim",
            title: "Professor of Ancient History",
            bio: "Expert in Egyptian political history",
          },
        ],
        highlights: [
          "10-week lecture series",
          "Q&A sessions",
          "Exclusive artifact viewings",
          "Course certificate",
        ],
        organizer: adminUser._id,
        tags: ["lecture", "queens", "women", "history"],
      },
      {
        title: "Family Day: Ancient Egypt for Kids",
        description:
          "A fun-filled day designed for families with children to explore ancient Egypt through interactive activities, games, crafts, and storytelling. Kids will dress up as pharaohs, make their own scarab amulets, and learn about mummies!",
        category: "Family Event",
        date: new Date("2024-12-30"),
        time: "10:00 AM - 3:00 PM",
        duration: 300,
        location: "Children's Wing",
        venue: {
          name: "DocentDesk Museum",
          address: "123 Museum Street",
          city: "Cairo",
          country: "Egypt",
          coordinates: { latitude: 30.0444, longitude: 31.2357 },
        },
        imageUrl: "/images/events/family-day.jpg",
        price: {
          adult: 120,
          child: 80,
          senior: 100,
          student: 80,
          currency: "EGP",
        },
        capacity: 100,
        availableSeats: 100,
        isFeatured: true,
        isPublished: true,
        ageRestriction: { min: 5, max: 12 },
        highlights: [
          "Pharaoh costume dress-up",
          "Make your own scarab amulet",
          "Mummy wrap game",
          "Egyptian storytelling",
          "Face painting",
          "Complimentary snacks",
        ],
        organizer: adminUser._id,
        tags: ["family", "kids", "interactive", "crafts"],
      },
      {
        title: "Photography in the Museum: Capturing Ancient Beauty",
        description:
          "Learn professional photography techniques while capturing the stunning artifacts of our Egyptian collection. This workshop is perfect for photography enthusiasts who want to improve their museum photography skills.",
        category: "Workshop",
        date: new Date("2025-01-15"),
        time: "4:00 PM",
        duration: 180,
        location: "Throughout Museum",
        venue: {
          name: "DocentDesk Museum",
          address: "123 Museum Street",
          city: "Cairo",
          country: "Egypt",
          coordinates: { latitude: 30.0444, longitude: 31.2357 },
        },
        imageUrl: "/images/events/photography-workshop.jpg",
        price: {
          adult: 250,
          student: 180,
          currency: "EGP",
        },
        capacity: 15,
        availableSeats: 15,
        isFeatured: false,
        isPublished: true,
        ageRestriction: { min: 16 },
        requirements: [
          "DSLR or mirrorless camera",
          "Tripod (recommended)",
          "Basic photography knowledge",
        ],
        highlights: [
          "Professional photographer instructor",
          "Low-light photography techniques",
          "Composition and framing tips",
          "Post-processing guidance",
        ],
        speakers: [
          {
            name: "Mohamed Ali",
            title: "Professional Photographer",
            bio: "Specializing in museum and artifact photography",
          },
        ],
        organizer: adminUser._id,
        tags: ["workshop", "photography", "art", "skills"],
      },
    ]);
    console.log("✅ Created 6 events".green);

    // Create sample feedback
    const feedback = await Feedback.create([
      {
        user: users[0]._id,
        artifact: artifacts[0]._id,
        type: "artifact",
        rating: 5,
        title: "Absolutely Stunning!",
        comment:
          "The golden mask is even more beautiful in person. The craftsmanship is incredible and the historical significance is overwhelming. A must-see!",
        isPublished: true,
        isVerified: true,
        helpfulCount: 15,
      },
      {
        user: users[1]._id,
        artifact: artifacts[1]._id,
        type: "artifact",
        rating: 5,
        title: "Key to Understanding",
        comment:
          "The Rosetta Stone is fascinating! It's amazing how this single artifact unlocked an entire civilization's written language. The museum's explanation is very informative.",
        isPublished: true,
        isVerified: true,
        helpfulCount: 12,
      },
      {
        user: users[1]._id,
        event: events[0]._id,
        type: "event",
        rating: 5,
        title: "Excellent Exhibition",
        comment:
          "The Life and Death exhibition exceeded all expectations. So many artifacts and the interactive elements made it engaging for all ages. Highly recommended!",
        isPublished: true,
        isVerified: true,
        helpfulCount: 23,
      },
      {
        user: users[0]._id,
        event: events[1]._id,
        type: "event",
        rating: 4,
        title: "Great Workshop",
        comment:
          "Learned so much about hieroglyphics in just 2 hours. The instructor was knowledgeable and patient. Would have liked a bit more hands-on practice time.",
        isPublished: true,
        isVerified: true,
        helpfulCount: 8,
      },
    ]);
    console.log("✅ Created sample feedback".green);

    console.log("\n🎉 Database seeded successfully!".green.bold);
    console.log("\n📊 Summary:".cyan.bold);
    console.log(
      `   • Admin User: ${adminUser.email} (password: admin123456)`.cyan
    );
    console.log(`   • Sample Users: ${users.length}`.cyan);
    console.log(`   • Artifacts: ${artifacts.length}`.cyan);
    console.log(`   • Events: ${events.length}`.cyan);
    console.log(`   • Feedback: ${feedback.length}`.cyan);

    console.log("\n🔑 Login Credentials:".yellow.bold);
    console.log("   Email: admin@docentdesk.com".yellow);
    console.log("   Password: admin123456".yellow);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:".red.bold, error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
