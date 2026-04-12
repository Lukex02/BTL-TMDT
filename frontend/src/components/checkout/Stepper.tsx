type Props = {
  currentStep: number;
};

const steps = ["Giỏ hàng", "Vận chuyển", "Thanh toán", "Xác nhận"];

export default function Stepper({ currentStep }: Props) {
  return (
    <div className="flex items-start justify-center w-full mb-16">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-medium transition-colors ${
                  isActive ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {stepNumber}
              </div>

              <div className="absolute top-12 w-24 text-center text-sm font-medium text-gray-700">
                {label}
              </div>
            </div>

            {!isLastStep && (
              <div 
                className={`w-16 h-[2px] mx-2 mb-0 ${
                  stepNumber < currentStep ? "bg-blue-500" : "bg-gray-300"
                }`} 
                style={{ marginTop: "-20px" }} // Vertically aligns line with circle center
              />
            )}
          </div>
        );
      })}
    </div>
  );
}