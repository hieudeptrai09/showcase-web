export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  manufacturer: string;
  inStock: boolean;
  stock: number;
  category: string;
  image: string;
  featured: boolean;
  rating: number;
  reviews: Review[];
  qna: QnA[];
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface QnA {
  id: number;
  question: string;
  answer: string;
  author: string;
  date: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop Gaming Pro X1",
    price: 25990000,
    description:
      "Laptop gaming hiệu năng cao với RTX 4070, Intel Core i9, RAM 32GB, SSD 1TB. Màn hình 15.6 inch 240Hz, thiết kế tản nhiệt tối ưu.",
    manufacturer: "TechPro",
    inStock: true,
    stock: 15,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
    featured: true,
    rating: 4.8,
    reviews: [
      {
        id: 1,
        author: "Nguyễn Văn A",
        rating: 5,
        comment: "Máy chạy rất mượt, đồ họa đẹp, giá hợp lý!",
        date: "2025-01-15",
      },
      {
        id: 2,
        author: "Trần Thị B",
        rating: 4,
        comment: "Tốt nhưng hơi nóng khi chơi game lâu.",
        date: "2025-01-10",
      },
    ],
    qna: [
      {
        id: 1,
        question: "Máy có hỗ trợ nâng cấp RAM không?",
        answer: "Có, máy có 2 khe RAM, có thể nâng cấp lên tối đa 64GB.",
        author: "Shop",
        date: "2025-01-12",
      },
    ],
  },
  {
    id: 2,
    name: "Chuột Gaming RGB M200",
    price: 899000,
    description:
      "Chuột gaming có dây với cảm biến quang học 16000 DPI, 8 nút bấm có thể tùy chỉnh, đèn RGB 16 triệu màu.",
    manufacturer: "GameGear",
    inStock: true,
    stock: 50,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    featured: true,
    rating: 4.5,
    reviews: [
      {
        id: 3,
        author: "Lê Văn C",
        rating: 5,
        comment: "Chuột rất nhạy, giá tốt!",
        date: "2025-01-14",
      },
    ],
    qna: [],
  },
  {
    id: 3,
    name: "Bàn phím cơ K350",
    price: 1590000,
    description:
      "Bàn phím cơ gaming với switch Cherry MX Red, đèn RGB per-key, keycap PBT Double-shot, khung nhôm cao cấp.",
    manufacturer: "KeyMaster",
    inStock: true,
    stock: 30,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
    featured: true,
    rating: 4.7,
    reviews: [],
    qna: [],
  },
  {
    id: 4,
    name: "Tai nghe Gaming H500",
    price: 1290000,
    description:
      "Tai nghe gaming 7.1 surround sound, mic khử ồn, đệm tai mềm mại, dây bện chống rối.",
    manufacturer: "SoundPro",
    inStock: true,
    stock: 25,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
    featured: true,
    rating: 4.6,
    reviews: [],
    qna: [],
  },
  {
    id: 5,
    name: "Màn hình Gaming 27 inch",
    price: 6990000,
    description:
      "Màn hình gaming 27 inch QHD 165Hz, IPS panel, 1ms response time, G-Sync compatible, HDR10.",
    manufacturer: "ViewMax",
    inStock: true,
    stock: 10,
    category: "Màn hình",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    featured: true,
    rating: 4.9,
    reviews: [],
    qna: [],
  },
  {
    id: 6,
    name: "PC Gaming Full Setup",
    price: 35990000,
    description:
      "PC Gaming đầy đủ: RTX 4080, Intel Core i7-14700K, 32GB RAM, 2TB SSD, Vỏ case tempered glass.",
    manufacturer: "BuildPro",
    inStock: true,
    stock: 5,
    category: "PC",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    featured: true,
    rating: 5.0,
    reviews: [],
    qna: [],
  },
  {
    id: 7,
    name: "Ghế Gaming Ergonomic",
    price: 4590000,
    description:
      "Ghế gaming công thái học, tựa lưng 180 độ, gối đầu và gối lưng, da PU cao cấp.",
    manufacturer: "ComfortChair",
    inStock: true,
    stock: 20,
    category: "Nội thất",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500",
    featured: false,
    rating: 4.4,
    reviews: [],
    qna: [],
  },
  {
    id: 8,
    name: "Webcam 4K Pro",
    price: 2490000,
    description:
      "Webcam 4K 60fps, autofocus, mic stereo, light correction, phù hợp streaming và họp online.",
    manufacturer: "StreamCam",
    inStock: false,
    stock: 0,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=500",
    featured: false,
    rating: 4.3,
    reviews: [],
    qna: [],
  },
  {
    id: 9,
    name: "SSD NVMe 2TB",
    price: 3990000,
    description:
      "Ổ cứng SSD NVMe Gen4, tốc độ đọc 7000MB/s, ghi 6000MB/s, bảo hành 5 năm.",
    manufacturer: "SpeedDrive",
    inStock: true,
    stock: 40,
    category: "Linh kiện",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    featured: false,
    rating: 4.8,
    reviews: [],
    qna: [],
  },
  {
    id: 10,
    name: "Loa Gaming 2.1",
    price: 1890000,
    description:
      "Hệ thống loa 2.1 gaming, công suất 80W, bass mạnh mẽ, điều khiển từ xa, đèn LED.",
    manufacturer: "BassMax",
    inStock: true,
    stock: 15,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    featured: false,
    rating: 4.5,
    reviews: [],
    qna: [],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 5 laptop gaming đáng mua nhất năm 2025",
    excerpt:
      "Tổng hợp những mẫu laptop gaming được đánh giá cao nhất trong năm với hiệu năng vượt trội và giá cả hợp lý.",
    content: `
      <h2>Giới thiệu</h2>
      <p>Năm 2025 là một năm bùng nổ của công nghệ laptop gaming với nhiều mẫu máy mới ra mắt với cấu hình mạnh mẽ và giá cả cạnh tranh hơn.</p>
      
      <h2>1. Laptop Gaming Pro X1</h2>
      <p>Dẫn đầu danh sách là mẫu laptop gaming với cấu hình khủng: RTX 4070, Intel Core i9, RAM 32GB. Máy chạy mượt mọi tựa game AAA ở mức đồ họa cao nhất.</p>
      
      <h2>2. Các tiêu chí đánh giá</h2>
      <p>Chúng tôi đánh giá dựa trên: hiệu năng gaming, khả năng tản nhiệt, chất lượng màn hình, thời lượng pin, và giá cả.</p>
      
      <h2>Kết luận</h2>
      <p>Việc chọn laptop gaming phù hợp phụ thuộc vào nhu cầu và ngân sách của bạn. Hãy ghé shop để được tư vấn chi tiết!</p>
    `,
    date: "2025-01-15",
    author: "Nguyễn Văn An",
    image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=800",
  },
  {
    id: 2,
    title: "Hướng dẫn chọn chuột gaming phù hợp",
    excerpt:
      "Các yếu tố quan trọng cần xem xét khi lựa chọn chuột gaming cho trải nghiệm chơi game tốt nhất.",
    content: `
      <h2>DPI là gì và tại sao quan trọng?</h2>
      <p>DPI (Dots Per Inch) quyết định độ nhạy của chuột. Game thủ FPS thường cần DPI cao để di chuyển nhanh và chính xác.</p>
      
      <h2>Cảm biến quang học vs Laser</h2>
      <p>Cảm biến quang học thường được ưa chuộng hơn vì độ chính xác cao và không bị lỗi trên nhiều bề mặt.</p>
      
      <h2>Trọng lượng và ergonomic</h2>
      <p>Chuột nhẹ giúp di chuyển nhanh nhưng chuột nặng lại cho cảm giác chắc chắn hơn. Chọn theo sở thích cá nhân.</p>
    `,
    date: "2025-01-10",
    author: "Trần Minh Tuấn",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
  },
  {
    id: 3,
    title: "Setup phòng gaming hoàn hảo với budget 50 triệu",
    excerpt:
      "Gợi ý cách setup một bộ gaming station hoàn chỉnh với ngân sách 50 triệu đồng.",
    content: `
      <h2>Phân bổ ngân sách</h2>
      <p>PC/Laptop: 35 triệu, Màn hình: 7 triệu, Bàn phím + Chuột: 3 triệu, Tai nghe: 2 triệu, Phụ kiện khác: 3 triệu.</p>
      
      <h2>Ưu tiên đầu tư</h2>
      <p>Nên ưu tiên đầu tư vào PC/Laptop vì đây là phần quan trọng nhất quyết định hiệu năng gaming.</p>
      
      <h2>Gợi ý sản phẩm</h2>
      <p>Với ngân sách này, bạn có thể chọn PC Gaming Full Setup kết hợp với màn hình 27 inch và bàn phím cơ K350.</p>
    `,
    date: "2025-01-05",
    author: "Lê Thị Hương",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800",
  },
  {
    id: 4,
    title: "Bảo dưỡng gear gaming đúng cách",
    excerpt:
      "Cách vệ sinh và bảo dưỡng thiết bị gaming để kéo dài tuổi thọ và duy trì hiệu năng.",
    content: `
      <h2>Vệ sinh định kỳ</h2>
      <p>Nên vệ sinh bàn phím, chuột ít nhất 2 tuần/lần để tránh bụi bẩn tích tụ gây hỏng hóc.</p>
      
      <h2>Bảo quản đúng cách</h2>
      <p>Tránh để thiết bị ở nơi ẩm ướt, nhiệt độ cao. Laptop nên được đặt trên bề mặt cứng để tản nhiệt tốt.</p>
      
      <h2>Kiểm tra phần mềm</h2>
      <p>Cập nhật driver định kỳ, quét virus, dọn dẹp file rác để máy luôn chạy mượt mà.</p>
    `,
    date: "2025-01-01",
    author: "Phạm Văn Đức",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800",
  },
];

export const shopInfo = {
  name: "GameHub Store",
  tagline: "Thiên đường gaming gear cho mọi game thủ",
  description:
    "Chuyên cung cấp các sản phẩm gaming chính hãng, chất lượng cao với giá cả hợp lý. Đội ngũ tư vấn nhiệt tình, chuyên nghiệp.",
  address: "123 Đường Láng, Đống Đa, Hà Nội",
  phone: "024-3456-7890",
  email: "contact@gamehubstore.vn",
  businessLicense: "0123456789",
  founded: "2020",
  googleMapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6073094443147!2d105.80894731533406!3d21.006875594301785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5568f0c0a9%3A0x64b5c6d5c5e3e2d7!2zTMOgbmcgSMOgLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s",
  social: {
    facebook: "https://facebook.com/gamehubstore",
    instagram: "https://instagram.com/gamehubstore",
    youtube: "https://youtube.com/@gamehubstore",
    tiktok: "https://tiktok.com/@gamehubstore",
  },
};
