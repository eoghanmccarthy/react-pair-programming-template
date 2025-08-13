import { useState, useCallback } from "react";
import type { Route } from "./+types/dataset";

interface ImageData {
  id: string;
  file: File;
  url: string;
  name: string;
  tags: string[];
  category: string;
  uploadedAt: Date;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dataset Manager" },
    { name: "description", content: "Manage your image datasets" },
  ];
}

export default function DatasetManager() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    files.forEach(file => {
      const imageData: ImageData = {
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        tags: [],
        category: 'uncategorized',
        uploadedAt: new Date(),
      };

      setImages([imageData]);
    });
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );
    
    files.forEach(file => {
      const imageData: ImageData = {
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        tags: [],
        category: 'uncategorized',
        uploadedAt: new Date(),
      };

      setImages([imageData]);
    });
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const updateImageTags = useCallback((id: string, tags: string[]) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, tags } : img
    ));
  }, []);

  const updateImageCategory = useCallback((id: string, category: string) => {
    setImages(prev => prev.map(img => 
      img.id !== id ? { ...img, category } : img
    ));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Image Dataset Manager
        </h1>
        
        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 mb-8 text-center transition-colors ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 bg-white hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="text-4xl text-gray-400">📁</div>
            <div>
              <p className="text-lg text-gray-600">
                Drag and drop images here, or click to select
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports JPG, PNG, GIF, WebP
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Dataset Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Dataset Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{images.length}</div>
              <div className="text-sm text-gray-600">Total Images</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {images.filter(img => img.tags.length > 0).length}
              </div>
              <div className="text-sm text-gray-600">Tagged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {images.filter(img => img.category !== 'uncategorized').length}
              </div>
              <div className="text-sm text-gray-600">Categorized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(images.flatMap(img => img.tags)).size}
              </div>
              <div className="text-sm text-gray-600">Unique Tags</div>
            </div>
          </div>
        </div>

        {/* TODO: Search and Filter Section - FOR INTERVIEWEE TO IMPLEMENT */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            🚧 TODO: Search & Filter (For You to Implement)
          </h3>
          <p className="text-yellow-700 text-sm">
            Add search functionality to filter images by name, tags, or category.
            Consider adding filter buttons for quick category selection.
          </p>
        </div>

        {/* Image Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onRemove={() => removeImage(image.id)}
                onUpdateTags={(tags) => updateImageTags(image.id, tags)}
                onUpdateCategory={(category) => updateImageCategory(image.id, category)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl text-gray-300 mb-4">🖼️</div>
            <p className="text-gray-500">No images uploaded yet</p>
            <p className="text-sm text-gray-400">Upload some images to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageCard({ 
  image, 
  onRemove, 
  onUpdateTags, 
  onUpdateCategory 
}: {
  image: ImageData;
  onRemove: () => void;
  onUpdateTags: (tags: string[]) => void;
  onUpdateCategory: (category: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState(image.tags.join(', '));
  const [categoryInput, setCategoryInput] = useState(image.category);

  const handleSave = () => {
    const tags = tagInput.split(',').map(tag => tag.trim()).filter(Boolean);
    onUpdateTags(tags);
    onUpdateCategory(categoryInput);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTagInput(image.tags.join(', '));
    setCategoryInput(image.category);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src={image.url}
          alt={image.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          ×
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate mb-2">
          {image.name}
        </h3>
        
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500">Category</label>
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="e.g. animals, vehicles"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="e.g. dog, outdoor, sunny"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-1 bg-gray-400 text-white text-sm rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div>
              <span className="text-xs text-gray-500">Category: </span>
              <span className={`text-sm px-2 py-1 rounded ${
                image.category === 'uncategorized' 
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {image.category}
              </span>
            </div>
            
            {image.tags.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Tags:</div>
                <div className="flex flex-wrap gap-1">
                  {image.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2"
            >
              Edit Metadata
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
