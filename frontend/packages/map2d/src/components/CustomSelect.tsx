// src/components/CustomSelect.tsx
import { useState } from 'react';

interface CustomSelectProps {
  options: any;
  selectedOptionState: [any, React.Dispatch<React.SetStateAction<any>>];
  onSelect: (option: any) => void;
}

/**
 * 커스텀 셀렉트
 * 
 * @param options 옵션 목록
 * @param selectedOptionState 선택된 옵션과 드롭다운 상태 관리
 * @param onSelect 옵션 선택 시 호출되는 함수
 */
function CustomSelect({ options, selectedOptionState, onSelect }: CustomSelectProps) {
  // 선택된 옵션과 드롭다운 상태 관리
  const [selectedOption, setSelectedOption] = selectedOptionState;
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 토글 함수
  const toggleDropdown = () => setIsOpen(prevState => !prevState);

  // 옵션 선택 함수
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  // 드롭다운 클릭 이벤트 전파 방지
  const handleOptionClick = (option: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
    selectOption(option);
  };

  return (
    <div className="custom-select" onClick={toggleDropdown}>
      <span>
        {selectedOption || 'Select an option'}
      </span>
      {isOpen && (
        <div className="select-option">
          <div className="select-scroll">
            {options.map(([key, value], idx) => (
              <div
                key={idx}
                className="list"
                onClick={(event) => handleOptionClick(key, event)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;