// components/checkout/Stepper.tsx
type Props = {
  currentStep: number;
};

const steps = ["Giỏ hàng", "Vận chuyển", "Thanh toán", "Xác nhận"];

export default function Stepper({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const active = stepNumber <= currentStep;

        return (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${
                  active ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {stepNumber}
              </div>
              <span className="text-sm mt-2">{label}</span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-300"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}