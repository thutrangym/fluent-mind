'use client'

import { useState } from 'react'

type FaqItem = {
  id: number
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'Luyện shadowing như thế nào thì hiệu quả?',
    answer:
      'Hãy chọn đoạn ngắn (3–5 phút), nghe kỹ trước 1–2 lần, sau đó bắt chước theo từng câu. Tập trung vào nhịp điệu, ngữ điệu và phát âm.',
  },
  {
    id: 2,
    question: 'Nghe chép chính tả như thế nào thì hiệu quả?',
    answer:
      'Nghe video và chép lại từng câu một, không cần dịch nghĩa ngay. Lặp lại nhiều lần cho mỗi đoạn.',
  },
  {
    id: 3,
    question: 'Tôi nên học bao nhiêu phút mỗi ngày để tiến bộ rõ rệt?',
    answer:
      'Chỉ cần 15–30 phút/ngày nhưng đều đặn, bạn sẽ thấy cải thiện rõ sau 1–2 tháng.',
  },
  {
    id: 4,
    question: 'Nên học từ vựng mới bằng cách nào để nhớ lâu?',
    answer:
      'Dùng flashcards và phương pháp lặp lại ngắt quãng (SRS).',
  },
  {
    id: 5,
    question: 'Phương thức thanh toán nào được chấp nhận?',
    answer:
      'Chúng tôi chấp nhận thẻ tín dụng, thẻ ghi nợ và các phương thức qua Stripe.',
  },
]

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(1)

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-[0_20px_30px_rgba(0,0,0,0.06)]">
      {faqs.map((item, index) => {
        const isOpen = openId === item.id

        return (
          <div
            key={item.id}
            className="grid w-full grid-cols-[100px_1fr] border-b bg-white p-9 last:border-none"
          >
            {/* Number */}
            <span
              className={`self-center text-[36px] font-bold leading-7 ${
                isOpen
                  ? 'text-emerald-500'
                  : 'text-gray-300'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Question */}
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <p
                className={`text-[26px] font-bold leading-7 hover:underline ${
                  isOpen ? 'text-emerald-600' : 'text-gray-900'
                }`}
              >
                {item.question}
              </p>

              <span
                className={`ml-2 rounded-full bg-gray-100 px-4 py-2 transition-transform duration-300 ${
                  isOpen ? 'rotate-[135deg]' : ''
                }`}
              >
                +
              </span>
            </button>

            {/* Answer */}
            <div
              className={`col-start-2 overflow-hidden transition-all duration-300 ${
                isOpen ? 'opacity-100 mt-2' : 'h-0 opacity-0'
              }`}
            >
              <div className="text-[22px] leading-relaxed text-gray-700">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
