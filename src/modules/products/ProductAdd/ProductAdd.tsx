import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  OutlinedInput,
} from '@mui/material';
import React, { useState } from 'react';

// 카테고리 타입 정의
interface Category {
  label: string;
  subCategories: string[];
}

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ProductAdd: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>('');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);

  // 카테고리 데이터
  const categories: Record<string, Category> = {
    electronics: {
      label: '전자제품',
      subCategories: ['휴대폰', '노트북', '가전제품'],
    },
    fashion: {
      label: '패션',
      subCategories: ['의류', '액세서리', '신발'],
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 데이터 제출 로직 (예: API 호출)
    console.log({
      category,
      subCategory,
      productName,
      description,
      image,
      videoLink,
      accessories,
      versions,
    });
    // API 요청 등을 통해 DB에 저장하는 로직 구현
  };

  return (
    <div className="p-6 bg-yellow-50 rounded-lg max-w-md mx-auto shadow-lg">
      <h1 className="text-center text-brown-800 text-2xl font-bold mb-4">
        상품 등록
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-brown-800">카테고리</label>
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory(''); // 카테고리 선택 시 하위 카테고리 초기화
            }}
          >
            <option value="">카테고리 선택</option>
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        {category && (
          <div className="mb-4">
            <label className="block font-semibold text-brown-800">
              하위 카테고리
            </label>
            <select
              className="w-full p-2 border rounded"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">하위 카테고리 선택</option>
              {categories[category].subCategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block font-semibold text-brown-800">
            상품 이름
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-brown-800">
            상세 설명
          </label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-brown-800">
            사진 업로드
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-brown-800">
            영상 링크
          </label>
          <input
            type="url"
            className="w-full p-2 border rounded"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-brown-800">부속품</label>
          <select
            multiple
            className="w-full p-2 border rounded"
            onChange={(e) => {
              const options = e.target.selectedOptions;
              setVersions(Array.from(options).map((option) => option.value));
            }}
          >
            <option value="product1">상품 1</option>
            <option value="product2">상품 2</option>
            <option value="product3">상품 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-brown-800">
            다른 버전
          </label>
          <select
            multiple
            className="w-full p-2 border rounded"
            onChange={(e) => {
              const options = e.target.selectedOptions;
              setVersions(Array.from(options).map((option) => option.value));
            }}
          >
            <option value="version1">버전 1</option>
            <option value="version2">버전 2</option>
            <option value="version3">버전 3</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          제출
        </button>
      </form>
    </div>
  );
};
