import DownloadButton from "./DownloadButton";

export default function PhotosPage() {
    const images = [
        '/images/IMG_1032.jpg',
        '/images/IMG_2141.jpg',
        '/images/IMG_8359.jpg',
        '/images/IMG_3084.jpg',
        '/images/IMG_2509.jpg',
        '/images/IMG_1528.jpg',
        '/images/IMG_4100.jpg',
        '/images/IMG_3273.jpg',
        '/images/IMG_4397.jpg',
      ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-full h-48 mb-2 overflow-hidden">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <DownloadButton image={image} />
        </div>
      ))}
    </div>
  );
}