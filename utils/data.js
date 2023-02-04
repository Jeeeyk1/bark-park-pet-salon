import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Justin Jake",
      email: "jake@example.com",
      password: bcrypt.hashSync("12345678"),
      isAdmin: true,
    },
    {
      name: "Alvin",
      email: "alvin@example.com",
      password: bcrypt.hashSync("alvincompra22"),
      isAdmin: false,
    },
    {
      name: "Panelist1",
      email: "panelist1@example.com",
      password: bcrypt.hashSync("Amanumberone"),
      isAdmin: true,
    },
    {
      name: "Panelist2",
      email: "panelist2@example.com",
      password: bcrypt.hashSync("Amanumberone"),
      isAdmin: false,
    },
    {
      name: "Panelist3",
      email: "panelist3@example.com",
      password: bcrypt.hashSync("Amanumberone"),
      isAdmin: true,
    },
    {
      name: "Panelist4",
      email: "panelist4@example.com",
      password: bcrypt.hashSync("Amanumberone"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Temptation",
      slug: "temptation",
      category: "Cat Treats",
      image: "/images/Temptation.png",
      isFeatured: false,
      featuredImage: '"/images/Temptation.png"',
      price: 105,
      rating: 0,
      numReviews: 0,
      countInStock: 30,
      description: "",
    },
    {
      name: "Carnilove soft snack",
      slug: "carnilove",
      category: "Cat Treats",
      image: "/images/CarniloveSoftSnackCatTreats.png",
      isFeatured: false,
      featuredImage: '"/images/CarniloveSoftSnackCatTreats.png"',
      price: 80,
      rating: 0,
      numReviews: 0,
      countInStock: 20,
      description: "",
    },
    {
      name: "Ciao Churu",
      slug: "ciao-churu",
      category: "Cat Treats",
      image: "/images/CIAOCHURU.png",
      isFeatured: true,
      featuredImage: '"/images/CIAOCHURU.png"',
      price: 103,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Kitkat Pur Pure Plus",
      slug: "kitkat-pure-plus",
      category: "Cat Treats",
      image: "/images/KITKATPurPureePlus.png",
      isFeatured: true,
      featuredImage: '"/images/KITKATPurPureePlus.png"',
      price: 110,
      rating: 0,
      numReviews: 10,
      countInStock: 50,
      description: "",
    },
    {
      name: "Kitkat Pur Pure",
      slug: "kitkat-pure",
      category: "Cat Treats",
      image: "/images/KITKAT Pur Puree.png",
      isFeatured: true,
      featuredImage: '"/images/KITKAT Pur Puree.png"',
      price: 105,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Cat",
      slug: "special-cat",
      category: "Cat Wet Food",
      image: "/images/SpecialCat.png",
      isFeatured: true,
      featuredImage: '"/images/SpecialCat.png"',
      price: 80,
      rating: 0,
      numReviews: 0,
      countInStock: 40,
      description: "",
    },
    {
      name: "Feline Gournet ",
      slug: "feline-grounet Snacks",
      category: "Dog Food",
      image: "/images/FelineGourmet.png",
      isFeatured: true,
      featuredImage: '"/images/FelineGourmet.png"',
      price: 82,
      rating: 0,
      numReviews: 0,
      countInStock: 20,
      description: "",
    },
    {
      name: "Kitkat Complete Cuisine",
      slug: "cuisine",
      category: "Cat Wet Food",
      image: "/images/KITKATCompleteCuisine.png",
      isFeatured: true,
      featuredImage: '"/images/KITKATCompleteCuisine.png"',
      price: 88.5,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Infinity Tuna in Jelly",
      slug: "jelly",
      category: "Cat Wet Food",
      image: "/images/InfinityTunaInJelly.png",
      isFeatured: true,
      featuredImage: '"/images/InfinityTunaInJelly.png"',
      price: 85,
      rating: 0,
      numReviews: 0,
      countInStock: 60,
      description: "",
    },
    {
      name: "Brit Premium Salmon                                                                             ",
      slug: "premium",
      category: "Cat Dry Food",
      image: "/images/BritPremiumSalmon.png",
      isFeatured: true,
      featuredImage: '"/images/BritPremiumSalmon.png"',

      price: 600,
      rating: 0,
      numReviews: 0,
      countInStock: 60,
      description: "Soft Snacks for all dogs",
    },
    {
      name: "Carnilove Duck and Pheasant",
      slug: "Sardines1",
      category: "Cat Dry Food",
      image: "/images/CarniloveDuck_Pheasant.png",
      isFeatured: true,
      featuredImage: '"/images/CarniloveDuck_Pheasant.png"',
      price: 800,
      rating: 0,
      numReviews: 0,
      countInStock: 20,
      description: "Soft Snacks for all dogs",
    },
    {
      name: "Aozi All Life Stages 20kg",
      slug: "Sardines5",
      category: "Dog Food",
      image: "/images/AoziAllLifeStages20kg.png",
      isFeatured: true,
      featuredImage: '"/images/AoziAllLifeStages20kg.png"',
      price: 3250,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "Soft Snacks for all dogs",
    },
    {
      name: "Top Ration Feline Nutrition 6kg",
      slug: "Feline",
      category: "Cat Dry Food",
      image: "/images/TopRationFelineNutrition6kg.png",
      isFeatured: true,
      featuredImage: '"/images/TopRationFelineNutrition6kg.png"',
      price: 1555,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Top Ration Tasty Bites 6kg",
      slug: "bites",
      category: "Cat Dry Food",
      image: "/images/TopRationTastyBites6kg.png",
      isFeatured: true,
      featuredImage: '"/images/TopRationTastyBites6kg.png"',
      price: 1335,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Cat 7kg",
      slug: "special-cat-7kg",
      category: "Cat Dry Food",
      image: "/images/SpecialCat7kg.png",
      isFeatured: true,
      featuredImage: '"/images/SpecialCat7kg.png"',
      price: 900,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Cat 1kg",
      slug: "special-cat-1kg",
      category: "Cat Dry Food",
      image: "/images/SpecialCat1kg.png",
      isFeatured: false,
      featuredImage: '"/images/SpecialCat1kg.png"',
      price: 130,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Whiskas 1+ Adult 7kg",
      slug: "whiskas-7kg",
      category: "Cat Dry Food",
      image: "/images/Whiskas1+Adult7kg.png",
      isFeatured: false,
      featuredImage: '"/images/Whiskas1+Adult7kg.png"',
      price: 130,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Whiskas 1+ Adult 1kg",
      slug: "whiskas-1kg",
      category: "Cat Dry Food",
      image: "/images/Whiskas1+Adult1kg.png",
      isFeatured: false,
      featuredImage: '"/images/Whiskas1+Adult1kg.png"',
      price: 143,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Pedigree Adult 20kg",
      slug: "pedigree",
      category: "Dog Dry Food",
      image: "/images/PedigreeAdult20kg.png",
      isFeatured: false,
      featuredImage: '"/images/PedigreeAdult20kg.png"',
      price: 2232,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Pedigree Adult 1kg",
      slug: "pedigree1kg",
      category: "Dog Dry Food",
      image: "/images/PedigreeAdult1kg.png",
      isFeatured: false,
      featuredImage: '"/images/PedigreeAdult1kg.png"',
      price: 119,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Pedigree Puppy 15kg",
      slug: "pedigreepuppy",
      category: "Dog Dry Food",
      image: "/images/PedigreePuppy15kg.png",
      isFeatured: false,
      featuredImage: '"/images/PedigreePuppy15kg.png"',
      price: 2097,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Pedigree Puppy 1kg",
      slug: "pedigreepuppy1kg",
      category: "Dog Dry Food",
      image: "/images/PedigreePuppy1kg.png",
      isFeatured: false,
      featuredImage: '"/images/PedigreePuppy1kg.png"',
      price: 144,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Top Ration Hi-Nutrition 18.14kg",
      slug: "rg",
      category: "Dog Dry Food",
      image: "/images/TopRationHi-Nutrition18.14kg.png",
      isFeatured: false,
      featuredImage: '"/images/TopRationHi-Nutrition18.14kg.png"',
      price: 2100,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Top Ration Hi-Nutrition 1kg",
      slug: "ration1kg",
      category: "Dog Dry Food",
      image: "/images/TopRationHi-Nutrition1Kg.png",
      isFeatured: false,
      featuredImage: '"/images/TopRationHi-Nutrition1Kg.png"',
      price: 116,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },

    {
      name: "Holistic Puppy 15kg",
      slug: "holistic-15kg",
      category: "Dog Dry Food",
      image: "/images/HolisticPuppy15kg.png",
      isFeatured: false,
      featuredImage: '"/images/HolisticPuppy15kg.png"',
      price: 2751,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Holistic Puppy 1kg",
      slug: "holistic-1kg",
      category: "Dog Dry Food",
      image: "/images/HolisticPuppy1kg.png",
      isFeatured: false,
      featuredImage: '"/images/HolisticPuppy1kg.png"',
      price: 191,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },

    {
      name: "Holistic Adult Sack",
      slug: "holistic-sack",
      category: "Dog Dry Food",
      image: "/images/HolisticAdultSack.png",
      isFeatured: false,
      featuredImage: '"/images/HolisticAdultSack.png"',
      price: 2761,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },

    {
      name: "Holistic Adult 1kg",
      slug: "holistic-adul-1kg",
      category: "Dog Dry Food",
      image: "/images/HolisticAdult1kg.png",
      isFeatured: false,
      featuredImage: '"/images/HolisticAdult1kg.png"',
      price: 186,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Dog Adult 9kg",
      slug: "dog-adult-9kg",
      category: "Dog Dry Food",
      image: "/images/SpecialDogAdult9kg.png",
      isFeatured: false,
      featuredImage: '"/images/SpecialDogAdult9kg.png"',
      price: 1250,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Dog Adult 1kg",
      slug: "dog-adult-1kg",
      category: "Dog Dry Food",
      image: "/images/SpecialDogAdult1kg.png",
      isFeatured: false,
      featuredImage: '"/images/SpecialDogAdult1kg.png"',
      price: 125,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Aozi Dog Adult Sack",
      slug: "dog-adult-sack",
      category: "Dog Dry Food",
      image: "/images/AoziDogAdultSack.png",
      isFeatured: false,
      featuredImage: '"/images/AoziDogAdultSack.png"',
      price: 2880,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Aozi Dog Adult 1kg",
      slug: "aozi-dog-adult-1kg",
      category: "Dog Dry Food",
      image: "/images/AoziDogAdult1kg.png",
      isFeatured: false,
      featuredImage: '"/images/AoziDogAdult1kg.png"',
      price: 151,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Dog Puppy 9kg",
      slug: "dog-puppy-9kg",
      category: "Dog Dry Food",
      image: "/images/SpecialDogPuppy9kg.png",
      isFeatured: false,
      featuredImage: '"/images/SpecialDogPuppy9kg.png"',
      price: 1257,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Dog Puppy 1kg",
      slug: "dog-puppy-1kg",
      category: "Dog Dry Food",
      image: "/images/SpecialDogPuppy1kg.png",
      isFeatured: false,
      featuredImage: '"/images/SpecialDogPuppy1kg.png"',
      price: 150,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Aozi Dog Puppy sack",
      slug: "dog-aozi-sack",
      category: "Dog Dry Food",
      image: "/images/AoziDogPuppySack.png",
      isFeatured: false,
      featuredImage: '"/images/AoziDogPuppySack.png"',
      price: 3130,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Aozi Dog Puppy 1kg",
      slug: "dog-aozi-sack-1kg",
      category: "Dog Dry Food",
      image: "/images/AoziDogPuppy1kg.png",
      isFeatured: false,
      featuredImage: '"/images/AoziDogPuppy1kg.png"',
      price: 155,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Premium Dog in can Pork",
      slug: "Brit-premium",
      category: "Dog Wet Food",
      image: "/images/BritPremiumDogincanPork.png",
      isFeatured: false,
      featuredImage: '"/images/BritPremiumDogincanPork.png"',
      price: 96,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Premium Dog in Can Fish",
      slug: "Brit-premium-cat",
      category: "Dog Wet Food",
      image: "/images/BritPremiumDoginCanFish.png",
      isFeatured: false,
      featuredImage: '"/images/BritPremiumDoginCanFish.png"',
      price: 96,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Premium Dog in can Turkey",
      slug: "Brit-premium-turkey",
      category: "Dog Wet Food",
      image: "/images/BritPremiumDogincanTurkey.png",
      isFeatured: false,
      featuredImage: '"/images/BritPremiumDogincanTurkey.png"',
      price: 96,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Premium Dog in can Beef",
      slug: "Brit-premium-beef",
      category: "Dog Wet Food",
      image: "/images/BritPremiumDogincanBeef.png",
      isFeatured: false,
      featuredImage: '"/images/BritPremiumDogincanBeef.png"',
      price: 96,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Montego Classic",
      slug: "Montego",
      category: "Dog Wet Food",
      image: "/images/MontegoClassic.png",
      isFeatured: false,
      featuredImage: '"/images/MontegoClassic.png"',
      price: 83,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Special Dog Pate",
      slug: "special-pate",
      category: "Dog Wet Food",
      image: "/images/SpecialDogPate.png",
      isFeatured: false,
      featuredImage: '"/images/SpecialDogPate.png"',
      price: 90,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Teo in Can for Puppy",
      slug: "teo-in-can",
      category: "Dog Wet Food",
      image: "/images/TeoinCanforPuppy.png",
      isFeatured: false,
      featuredImage: '"/images/TeoinCanforPuppy.png"',
      price: 76,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Teo in Can for Adult",
      slug: "teo-in-can-adult",
      category: "Dog Wet Food",
      image: "/images/TeoinCanforAdult.png",
      isFeatured: false,
      featuredImage: '"/images/TeoinCanforAdult.png"',
      price: 60,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Fresh Fish",
      slug: "brit-fresh-fish",
      category: "Dog Wet Food",
      image: "/images/BritFreshFish.png",
      isFeatured: false,
      featuredImage: '"/images/BritFreshFish.png"',
      price: 122,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Fresh Beef",
      slug: "brit-fresh-beef",
      category: "Dog Wet Food",
      image: "/images/BritFreshBeef.png",
      isFeatured: false,
      featuredImage: '"/images/BritFreshBeef.png"',
      price: 122,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Pate and Meat  Salmon",
      slug: "brit-pate-salmon",
      category: "Dog Wet Food",
      image: "/images/BritPate_Meat Salmon.png",
      isFeatured: false,
      featuredImage: '"/images/BritPate_Meat Salmon.png"',
      price: 102,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Brit Mono Protein Beef",
      slug: "brit-mono-protein",
      category: "Dog Wet Food",
      image: "/images/BritMonoProteinBeef.png",
      isFeatured: false,
      featuredImage: '"/images/BritMonoProteinBeef.png"',
      price: 112,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Meat Jerky Stick",
      slug: "meat-jery-stick",
      category: "Dog Treats",
      image: "/images/MeatJerkyStick.png",
      isFeatured: false,
      featuredImage: '"/images/MeatJerkyStick.png"',
      price: 102,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Meat Jerky ",
      slug: "meat-jery",
      category: "Dog Treats",
      image: "/images/Meatjerky.png",
      isFeatured: false,
      featuredImage: '"/images/Meatjerky.png"',
      price: 102,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Zert Gelato ",
      slug: "zert-gelato",
      category: "Dog Treats",
      image: "/images/ZertGelato.png",
      isFeatured: false,
      featuredImage: '"/images/ZertGelato.png"',
      price: 170,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
    {
      name: "Carnilove Soft snack ",
      slug: "carnilove-soft-snack",
      category: "Dog Treats",
      image: "/images/CarniloveSoftsnackDogTreats.png",
      isFeatured: false,
      featuredImage: '"/images/CarniloveSoftsnackDogTreats.png"',
      price: 176,
      rating: 0,
      numReviews: 0,
      countInStock: 50,
      description: "",
    },
  ],
};
export default data;
