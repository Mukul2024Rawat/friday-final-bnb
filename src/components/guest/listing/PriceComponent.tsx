import React from 'react';

interface PriceBreakdownItem {
  label: string;
  value: string | number;
  isDiscount?: boolean;
}

interface PriceBreakdownProps {
  items: PriceBreakdownItem[];
  total: number;
}

const PriceComponent: React.FC<PriceBreakdownProps> = ({ items, total }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item, index) => (
          <dl key={index} className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">{item.label}</dt>
            <dd className={`text-base font-medium ${item.isDiscount ? 'text-green-600' : 'text-gray-900'}`}>
              {item.isDiscount ? '-' : ''}
              {typeof item.value === 'number' ? `$${item.value.toFixed(2)}` : item.value}
            </dd>
          </dl>
        ))}
      </div>
      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
        <dt className="text-base font-bold text-gray-900">Total</dt>
        <dd className="text-base font-bold text-gray-900">
          ${total.toFixed(2)}
        </dd>
      </dl>
    </div>
  );
};

export default PriceComponent;