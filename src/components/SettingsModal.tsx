import React, { useState, useEffect } from 'react';
import { X, Key, Save, Check } from 'lucide-react';
import { CONFIG_KEYS, getApiKey, setApiKey } from '../service/config';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [anthropicKey, setAnthropicKey] = useState('');
  const [openSanctionsKey, setOpenSanctionsKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnthropicKey(getApiKey(CONFIG_KEYS.ANTHROPIC_API_KEY) || '');
      setOpenSanctionsKey(getApiKey(CONFIG_KEYS.OPENSANCTIONS_API_KEY) || '');
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(CONFIG_KEYS.ANTHROPIC_API_KEY, anthropicKey.trim());
    setApiKey(CONFIG_KEYS.OPENSANCTIONS_API_KEY, openSanctionsKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <Key className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold">Cấu hình API</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4 text-left">
          <div className="text-center text-slate-500 py-8">
            <p>Tính năng API đã được vô hiệu hóa tạm thời theo yêu cầu.</p>
            <p className="text-sm mt-2">Dữ liệu hiện tại đang sử dụng bộ dữ liệu mẫu (mock data).</p>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={saved}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:bg-green-600"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Đã lưu
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu cài đặt
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
