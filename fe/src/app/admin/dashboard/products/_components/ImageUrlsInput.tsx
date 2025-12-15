interface ImageUrlsInputProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUrlsInput({
  images,
  onChange,
}: ImageUrlsInputProps) {
  const addImageField = () => {
    onChange([...images, ""]);
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    onChange(newImages);
  };

  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages.length > 0 ? newImages : [""]);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Image URLs
      </label>
      {images.map((img, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="url"
            value={img}
            onChange={(e) => updateImageField(index, e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => removeImageField(index)}
              className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addImageField}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        + Add another image
      </button>
    </div>
  );
}
