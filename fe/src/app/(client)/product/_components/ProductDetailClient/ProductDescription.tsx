interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mô tả sản phẩm</h2>
      <p className="text-gray-700 whitespace-pre-line">{description}</p>
    </div>
  );
}
