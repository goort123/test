'use client'

import { useState } from 'react'
import Image from 'next/image'
import Timer from './Timer'
import { useGetTariffsQuery } from '@/lib/api/tariffsApi'
import { Sparkle } from 'lucide-react'
import type { Tariff } from '@/lib/types/tariff'

interface TariffWithDiscount extends Tariff {
  uniqueId: string
  discount: number
}

export default function PricingSection() {
  const { data: tariffs, isLoading, error } = useGetTariffsQuery()
  const [selectedTariffId, setSelectedTariffId] = useState<string | null>(null)
  const [isAgreed, setIsAgreed] = useState<boolean>(false)
  const [showCheckboxError, setShowCheckboxError] = useState<boolean>(false)
  const [discountsActive, setDiscountsActive] = useState<boolean>(true)

  if (isLoading) {
    return (
      <section className="relative min-h-screen bg-bg-dark rounded-[60px] overflow-hidden flex items-center justify-center">
        <div className="text-text-white text-2xl">Загрузка тарифов...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative min-h-screen bg-bg-dark rounded-[60px] overflow-hidden flex items-center justify-center">
        <div className="text-red-500 text-2xl">Ошибка загрузки тарифов</div>
      </section>
    )
  }

  if (!tariffs) {
    return null
  }

  const tariffsArray: Tariff[] = typeof tariffs === 'string' ? JSON.parse(tariffs) : tariffs
  const tariffsWithDiscount: TariffWithDiscount[] = tariffsArray.map((tariff: Tariff) => ({
    ...tariff,
    uniqueId: `${tariff.id}-${tariff.period}`,
    discount: Math.round(((tariff.full_price - tariff.price) / tariff.full_price) * 100),
  }))

  const bestTariff: TariffWithDiscount | undefined = tariffsWithDiscount.find((t: TariffWithDiscount) => t.is_best)
  const otherTariffs: TariffWithDiscount[] = tariffsWithDiscount.filter((t: TariffWithDiscount) => !t.is_best)

  if (!selectedTariffId && bestTariff) {
    setSelectedTariffId(bestTariff.uniqueId)
  }

  const handleBuyClick = (): void => {
    if (!isAgreed) {
      setShowCheckboxError(true)
      setTimeout(() => setShowCheckboxError(false), 2000)
      return
    }
    console.log('Purchase tariff:', selectedTariffId)
  }

  const handleTimerExpire = (): void => {
    setDiscountsActive(false)
  }

  return (
    <section className="relative min-h-screen bg-bg-dark rounded-[18px] md:rounded-[60px] overflow-hidden pb-20">
      <div className="bg-bg-green w-full py-2">
        <div className="text-center mb-1">
          <p className="text-text-white text-lg md:text-2xl font-semibold">Успейте открыть пробную неделю</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Sparkle className="w-3.5 h-3.5 md:w-6 md:h-6" />
          <Timer initialMinutes={2} onExpire={handleTimerExpire} />
          <Sparkle className="w-3.5 h-3.5 md:w-6 md:h-6" />
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4 py-6 md:py-12">
        <div className="max-w-[1216px] w-full">

          <h1 className="text-text-white text-2xl md:text-[40px] font-bold leading-tight md:leading-[44px] mb-6 md:mb-12 tracking-[0.4px]">
            Выбери подходящий для себя <span className="text-primary">тариф</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 items-start mb-12">
            <div className="relative w-full md:w-[380px] flex-shrink-0 mx-auto md:mx-0 max-w-[124px] md:max-w-none">
              <Image
                src="/assets/hero-image.png"
                alt="Hero"
                width={380}
                height={767}
                className="object-cover rounded-[18px] md:rounded-[60px] w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-dark to-transparent rounded-b-[18px] md:rounded-b-[60px]" />
            </div>

            <div className="flex flex-col gap-4 md:gap-6 flex-1 w-full">
              {bestTariff && (
                <div
                  onClick={() => setSelectedTariffId(bestTariff.uniqueId)}
                  className={`relative bg-bg-card rounded-[20px] md:rounded-[34px] border-2 w-full md:max-w-[748px] h-auto md:h-[190px] cursor-pointer transition-all ${selectedTariffId === bestTariff.uniqueId ? 'border-primary' : 'border-border-default'
                    }`}
                >
                  {discountsActive && (
                    <div className="absolute top-0 left-0 bg-danger rounded-bl-[8px] rounded-br-[8px] px-1.5 md:px-2 py-0.5 md:py-1 transition-opacity duration-500">
                      <span className="text-text-white text-base md:text-[22px] font-medium">-{bestTariff.discount}%</span>
                    </div>
                  )}
                  <div className="absolute top-[6px] md:top-[10px] right-4 md:right-20">
                    <span className="text-primary text-base md:text-[22px] font-medium tracking-[0.66px]">хит!</span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center h-full px-6 md:px-10 py-5 md:py-[30px] gap-6 md:gap-10">
                    <div className="flex flex-col items-center gap-2 md:gap-2">
                      <h3 className="text-text-white text-lg md:text-[26px] font-medium">{bestTariff.period}</h3>
                      <div className="flex flex-col items-center">
                        <span className="text-primary text-[34px] md:text-[50px] font-semibold leading-tight">{bestTariff.price} ₽</span>
                        {discountsActive && (
                          <span className="text-text-muted text-base md:text-2xl line-through">{bestTariff.full_price} ₽</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full md:w-[328px]">
                      <p className="text-text-white text-sm md:text-base leading-tight md:leading-[20.8px] text-center md:text-left">{bestTariff.text}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {otherTariffs.reverse().map((tariff) => (
                  <div
                    key={tariff.uniqueId}
                    onClick={() => setSelectedTariffId(tariff.uniqueId)}
                    className={`relative bg-bg-card rounded-[20px] md:rounded-[40px] border-2 w-full md:w-[240px] h-auto md:min-h-[335px] cursor-pointer transition-all ${selectedTariffId === tariff.uniqueId ? 'border-primary' : 'border-border-default'
                      }`}
                  >
                    {discountsActive && (
                      <div className="absolute top-0 left-0 bg-danger rounded-br-[8px] px-2 py-1">
                        <span className="text-text-white text-base md:text-[22px] font-medium">-{tariff.discount}%</span>
                      </div>
                    )}

                    <div className="flex flex-col items-center pt-8 md:pt-[60px] px-4 md:px-[21px] pb-6">
                      <h3 className="text-text-white text-lg md:text-[26px] font-medium mb-2 md:mb-4">
                        {tariff.period}
                      </h3>

                      <div className="flex flex-col items-center mb-4 md:mb-6">
                        <span className="text-text-white text-[34px] md:text-[50px] font-semibold leading-tight">
                          {tariff.price} ₽
                        </span>
                        <span className="text-text-muted text-base md:text-2xl line-through">
                          {tariff.full_price} ₽
                        </span>
                      </div>

                      <p className="text-text-white text-center text-[13px] md:text-sm leading-snug max-w-[180px]">
                        {tariff.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-bg-secondary rounded-[20px] p-3 md:p-5 flex items-center gap-1.5 md:gap-2 w-full md:max-w-[499px]">
                <svg width="22" height="24" viewBox="0 0 24 26" fill="none" className="flex-shrink-0 w-[22px] h-[24px] md:w-6 md:h-[26px]">
                  <path d="M12 8.75V14.75" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 18.5H12.015" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-text-white text-xs md:text-base leading-tight md:leading-normal">
                  Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
                </p>
              </div>

              <div onClick={() => setIsAgreed(!isAgreed)} className="flex items-center gap-3 cursor-pointer">
                <div className={`w-[30px] h-[30px] md:w-8 md:h-8 rounded border-2 flex items-center justify-center transition-colors ${showCheckboxError
                  ? 'border-danger bg-danger/20'
                  : isAgreed
                    ? 'border-primary bg-[#424748]'
                    : 'border-border-checkbox'
                  }`}>
                  {isAgreed && <svg width="19" height="14" viewBox="0 0 20 15" fill="none" className="w-[19px] h-[14px] md:w-5 md:h-[15px]"><path d="M1 7.5L7 13.5L19 1.5" stroke="var(--color-primary)" strokeWidth="3" /></svg>}
                </div>
                <span className={`text-xs md:text-sm transition-colors ${showCheckboxError ? 'text-danger' : 'text-text-light'}`}>
                  Я согласен с офертой и политикой конфиденциальности
                </span>
              </div>

              <button
                onClick={handleBuyClick}
                className="bg-primary text-text-dark font-bold py-5 rounded-[20px] text-lg md:text-2xl w-full md:max-w-[499px] uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Купить
              </button>
              <div>
                <p className="text-[#9B9B9B] px-[30px]">Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[10px] md:gap-[30px] justify-center p-3 md:p-10 border border-border-default rounded-[20px] md:rounded-[30px] w-full mt-6 md:mt-12">
            <div className="bg-bg-secondary border border-success rounded-[30px] px-[18px] md:px-[30px] py-2.5 md:py-4">
              <span className="text-success text-lg md:text-[28px] font-medium leading-tight md:leading-[33.6px]">гарантия возврата 30 дней</span>
            </div>
            <p className="text-text-light text-sm md:text-2xl leading-tight md:leading-[31.2px] max-w-[1000px] text-center">
              Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели!
              Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки,
              если ты не получишь видимых результатов.
            </p>
          </div>

          <p className="text-text-muted text-[10px] md:hidden leading-tight mt-6 text-center px-4">
            Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
          </p>

        </div>
      </div>
    </section>

  )
}
