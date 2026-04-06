interface PricingCardProps {
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  description: string;
  isHit: boolean;
  isHighlighted: boolean;
}

export default function PricingCard({
  title,
  price,
  oldPrice,
  discount,
  description,
  isHit,
  isHighlighted,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-bg-card rounded-[24px] md:rounded-[34px] p-4 md:p-5 ${
        isHighlighted ? 'border-2 border-primary' : 'border-2 border-border-default'
      }`}
    >
      <div className="absolute top-0 left-0 bg-danger rounded-tl-none rounded-tr-none rounded-bl-[8px] rounded-br-[8px] px-2 py-1">
        <span className="text-text-white text-base md:text-[22px] font-medium leading-tight md:leading-[28.6px]">{discount}</span>
      </div>

      {isHit && (
        <div className="absolute top-[10px] right-4 md:right-5">
          <span className="text-primary text-lg md:text-[22px] font-medium leading-tight md:leading-[28.6px] tracking-[0.66px]">хит!</span>
        </div>
      )}

      <div className="pt-[30px] md:pt-[34px] flex flex-col items-center gap-3 md:gap-4">
        <div className="text-center">
          <h3 className="text-text-white text-xl md:text-[26px] font-medium leading-tight md:leading-[31.2px]">{title}</h3>
        </div>

        <div className="flex flex-col items-end">
          <span className={`${isHighlighted ? 'text-primary' : 'text-text-white'} text-3xl md:text-[50px] font-semibold leading-tight md:leading-[50px]`}>
            {price}
          </span>
          <div className="relative">
            <span className="text-text-muted text-lg md:text-2xl leading-tight md:leading-[28.8px]">{oldPrice}</span>
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-text-muted rounded-full" />
          </div>
        </div>

        <div className="text-center py-2 md:py-2.5">
          <p className="text-text-white text-sm md:text-base leading-tight md:leading-[20.8px]">{description}</p>
        </div>
      </div>
    </div>
  );
}
