import { ApiProduct } from "@/lib/api";

interface ProductQnAProps {
  qna: ApiProduct["qna"];
}

export default function ProductQnA({ qna }: ProductQnAProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Câu hỏi thường gặp
      </h2>
      <div className="space-y-6">
        {qna.map((item) => (
          <div key={item.id} className="border-b pb-4 last:border-b-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Q: {item.question}
            </h3>
            <p className="text-gray-600">A: {item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
