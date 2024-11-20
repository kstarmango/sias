// src/components/CustomSelect.tsx
import { useState } from 'react';

// CustomSelectProps 인터페이스 정의
interface CustomSelectProps {
  options: string[];
  selectedOptionState: [string, React.Dispatch<React.SetStateAction<string>>];
  onSelect: (option: string) => void;
}

/**
 * 커스텀 셀렉트 컴포넌트
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
            {options.map((option, idx) => (
              <div
                key={idx}
                className="list"
                onClick={(event) => handleOptionClick(option, event)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;