interface ProductCountProps {
  count: number;
}

export default function ProductCount({ count }: ProductCountProps) {
  return (
    <div className="mb-6">
      <p className="text-gray-600">Hiển thị {count} sản phẩm</p>
    </div>
  );
}
