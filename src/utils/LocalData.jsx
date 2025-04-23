import imgE from '../assets/images/dummyGlass.png';
import KFC_Img from '../assets/images/Kfc.png';
import MAC_Img from '../assets/images/Mac.png';

export const termsData = {
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
};

export const wishlistData =  {
    wishListItems: [
        {
            id: 1,
            tbl_bar: {
                overall_ratings: 4.5,
                bar_name: "The Happy Hour Lounge",
                bar_details: "A cozy bar with great cocktails and live music.",
                bar_image: imgE,
                bar_id: 101
            }
        },
        {
            id: 2,
            tbl_bar: {
                overall_ratings: 4.2,
                bar_name: "Sunset Rooftop Bar",
                bar_details: "A beautiful rooftop with a stunning view and premium drinks.",
                bar_image: imgE,
                bar_id: 102
            }
        },
        {
            id: 3,
            tbl_bar: {
                overall_ratings: 4.8,
                bar_name: "Whiskey Den",
                bar_details: "A paradise for whiskey lovers with a vast collection of spirits.",
                bar_image: imgE,
                bar_id: 103
            }
        }
    ]
}

export const dummyBarProfile = {
  selectedBarProfile: [
    {
      id: 1,
      bar_id: "123",
      bar_name: "The Juice Corner",
      bar_image: imgE,
      categories_served: JSON.stringify(["Juices", "Smoothies", "Shakes"]),
      overall_ratings: 4.5,
      latitude: 37.7749,
      longitude: -122.4194,
      work_start_time: "08:00 AM",
      work_end_time: "10:00 PM",
      tbl_cooking_time_range: {
        from: 10,
        to: 20,
      },
    },
    [
      {
        product_id: 101,
        product_name: "Mango Smoothie",
        stock_quantity: 25,
        product_images: imgE,
        tbl_category: {
          category_name: "Smoothies",
        },
      },
      {
        product_id: 101,
        product_name: "Mango Smoothie",
        stock_quantity: 25,
        product_images: imgE,
        tbl_category: {
          category_name: "Smoothies",
        },
      },
      {
        product_id: 102,
        product_name: "Strawberry Shake",
        stock_quantity: 15,
        product_images: imgE,
        tbl_category: {
          category_name: "Shakes",
        },
      },
      {
        product_id: 103,
        product_name: "Orange Juice",
        stock_quantity: 30,
        product_images: imgE,
        tbl_category: {
          category_name: "Juices",
        },
      },
    ],
  ],
  cartItems: [
    {
      product_id: 101,
      quantity: 2,
    },
    {
      product_id: 103,
      quantity: 1,
    },
  ],
};

export const notificationData = {
    allNotificationList: [
        {
            notification_id: 1,
            title: 'Order Confirmation',
            body: 'Your order #12345 has been confirmed!',
            unread: true,
            createdAt: new Date().toISOString(),
        },
        {
            notification_id: 2,
            title: 'Delivery Update',
            body: 'Your package is out for delivery.',
            unread: false,
            createdAt: new Date().toISOString(),
        },
        {
            notification_id: 3,
            title: 'Special Offer',
            body: 'Get 20% off on your next purchase!',
            unread: true,
            createdAt: new Date().toISOString(),
        },
    ]
} 

export const allDiscountDummyData = {
  allDiscountCoupons: [
      {
          coupon_code: "DISCOUNT_12345",
          discount_type: "percentage",
          discount: 20,
          bar_image: KFC_Img,
          valid_to: "2025-12-31",
          bar_name: "Bar One"
      },
      {
          coupon_code: "SAVE_67890",
          discount_type: "fixed",
          discount: 5.5,
          bar_image: MAC_Img,
          valid_to: "2025-11-30",
          bar_name: "Bar Two"
      },
      {
          coupon_code: "OFFER_ABCDE",
          discount_type: "percentage",
          discount: 15,
          bar_image: KFC_Img,
          valid_to: "2025-10-15",
          bar_name: "Bar Three"
      },
      {
          coupon_code: "PROMO_XYZ",
          discount_type: "fixed",
          discount: 10,
          bar_image: MAC_Img,
          valid_to: "2025-09-25",
          bar_name: "Bar Four"
      }
  ]
};

export const orderHistoryDummyData = {
  allOrderHistory: [
      {
          order_id: "ORD_1001",
          grand_total: 45.99,
          platform_charges: 2.5,
          sales_tax: 3.0,
          sub_total: 40.49,
          coupon: "SAVE10",
          tbl_bar: {
              bar_name: "Bar One",
              bar_image: imgE,
              tbl_cooking_time_range: {
                  to: "15 mins"
              }
          }
      },
      {
          order_id: "ORD_1002",
          grand_total: 30.50,
          platform_charges: 1.8,
          sales_tax: 2.2,
          sub_total: 26.50,
          coupon: null,
          tbl_bar: {
              bar_name: "Bar Two",
              bar_image: imgE,
              tbl_cooking_time_range: {
                  to: "10 mins"
              }
          }
      },
      {
          order_id: "ORD_1003",
          grand_total: 55.00,
          platform_charges: 3.0,
          sales_tax: 4.5,
          sub_total: 47.50,
          coupon: "FREESHIP",
          tbl_bar: {
              bar_name: "Bar Three",
              bar_image: imgE,
              tbl_cooking_time_range: {
                  to: "20 mins"
              }
          }
      },
      {
          order_id: "ORD_1004",
          grand_total: 25.75,
          platform_charges: 1.5,
          sales_tax: 2.0,
          sub_total: 22.25,
          coupon: null,
          tbl_bar: {
              bar_name: "Bar Four",
              bar_image: imgE,
              tbl_cooking_time_range: {
                  to: "12 mins"
              }
          }
      }
  ]
};

export const allProductMaterialDummyData = {
  productDetails: [
    {
        id: "PROD_001",
        brand_name: "Fresh Juices Co.",
        product_name: "Mango Juice",
        price: 6.99,
        after_price: 5.49,
        product_images: "mango_juice.jpg",
        variations: [
          {
            variant_id: "VAR_001",
            product_name: "Mango Juice - 500ml",
            price: 5.49,
            product_images: "mango_juice_500ml.jpg",
          },
          {
            variant_id: "VAR_002",
            product_name: "Mango Juice - 1L",
            price: 9.99,
            product_images: "mango_juice_1L.jpg",
          }
        ]
      }
  ],
};

export const myCartDummyData = {
  cartItems: [
    {
      id: "ITEM_1001",
      name: "Orange Juice",
      quantity: 2,
      maxQuantity: 5,
      after_price: 5.99,
      images: "orange_juice.jpg",
      barId: "BAR_001",
    },
    {
      id: "ITEM_1002",
      name: "Apple Juice",
      quantity: 1,
      maxQuantity: 3,
      after_price: 4.99,
      images: "apple_juice.jpg",
      barId: "BAR_002",
    }
  ],
  getCoupons: {
    discount: "10",
    discount_type: "percentage",
    id: "COUPON_001",
  },
  totalAmount: 10.98,
  appData: {
    sales_tax: 1.50,
    platform_charges: 0.99,
  },
  activeCard: {
    cardNumber: "**** **** **** 1234",
    cardHolder: "John Doe",
    expiry: "12/25",
  },
  userCard: [
    {
      id: "CARD_001",
      card_type: "Visa",
      card_owner_name: "John Doe",
      card_expiry: "12/25",
    },
    {
      id: "CARD_002",
      card_type: "MasterCard",
      card_owner_name: "Jane Doe",
      card_expiry: "11/24",
    }
  ]
};

export const homeDummyData = {
  barLoadingState: false, // Set to true to simulate loading state
  homeData: {
      currentBarData: [
          {
              bar_id: "BAR_001",
              bar_name: "The Chill Lounge",
              bar_image: "chill_lounge.jpg",
              overall_ratings: 4.5,
              categories_served: JSON.stringify(["Cocktails", "Whiskey", "Live Music"]),
          },
          {
              bar_id: "BAR_002",
              bar_name: "Skyline Bar",
              bar_image: "skyline_bar.jpg",
              overall_ratings: 4.7,
              categories_served: JSON.stringify(["Beer", "Wine", "Rooftop"]),
          },
          {
              bar_id: "BAR_003",
              bar_name: "Retro Pub",
              bar_image: "retro_pub.jpg",
              overall_ratings: 4.2,
              categories_served: JSON.stringify(["Retro", "Karaoke", "Whiskey"]),
          }
      ],
      category: [
          {
              category_name: "Cocktails",
              category_icon: "cocktails.png",
          },
          {
              category_name: "Beer",
              category_icon: "beer.png",
          },
          {
              category_name: "Live Music",
              category_icon: "live_music.png",
          }
      ]
  }
};

export const barListingDummyData = {
  barList: {
      barData: [
          {
              bar_id: "001",
              bar_name: "The Sunset Lounge",
              bar_details: "A cozy lounge with the best sunset views.",
              bar_image: "sunset_lounge.jpg",
              overall_ratings: 4.6,
          },
          {
              bar_id: "002",
              bar_name: "The Jazz Club",
              bar_details: "Live jazz music and a wide selection of cocktails.",
              bar_image: "jazz_club.jpg",
              overall_ratings: 4.8,
          },
          {
              bar_id: "003",
              bar_name: "Tropical Vibes",
              bar_details: "A beach-themed bar with exotic drinks.",
              bar_image: "tropical_vibes.jpg",
              overall_ratings: 4.5,
          }
      ],
      lastPage: 2 // Simulates pagination behavior
  }
};

export const searchDummyData = {
  homeData: {
      trendSearches: [
          "Cocktail Bars",
          "Whiskey Lounge",
          "Live Music",
          "Rooftop Bars",
          "Craft Beer",
          "Wine Tasting",
      ]
  },
  barLoadingState: false // Simulates loading state
};