import tw from 'twin.macro';
import TailwindColor from '@videsk/tailwind-random-color';
import styled, { css } from 'styled-components';

const FooterContaienr = tw.footer`bg-gray-900 min-h-[100px]`;
const FooterMain = tw.div`container mx-auto grid gap-x-20 gap-y-4 lg:gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-20 pt-8 px-20 sm:px-0`;

const FooterBox = tw.div`text-white `;

const FooterTitle = styled.h3(() => [
  tw`text-base font-bold mb-4 border-t-2 border-t pt-4`,
]);
const FooterContent = tw.ul`text-[15px]`;
const FooterText = tw.h3`pb-2 text-gray-300`;

const Footer = () => {
  return (
    <FooterContaienr>
      <FooterMain>
        {dataFooter.map((value, key) => (
          <FooterBox key={key}>
            <FooterTitle
              style={{
                borderTop: `3px solid #${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`,
              }}
            >
              {value.title}
            </FooterTitle>
            <FooterContent>
              {value.content.map((value, key) => (
                <FooterText key={key}>{value}</FooterText>
              ))}
            </FooterContent>
          </FooterBox>
        ))}
      </FooterMain>
    </FooterContaienr>
  );
};

export default Footer;

const dataFooter = [
  {
    title: 'VỀ CHÚNG TÔI',
    content: [
      'Summon Hangout',
      'Tham gia Summon',
      'Điều khoản & Điều kiện',
      'Chính sách Bảo vệ dữ liệu & quyền riêng tư',
      'Tuyển dụng',
    ],
  },
  {
    title: 'TÀI KHOẢN VÀ THẺ',
    content: [
      'Tài khoản thanh toán',
      'Tiết kiệm có kỳ hạn',
      'Tiết kiệm mục tiêu',
      'Thẻ ghi nợ Summon',
      'Thẻ tín dụng Summon Visa',
    ],
  },
  {
    title: 'SẢN PHẨM TÀI CHÍNH',
    content: [
      'Bảo hiểm nhân thọ Sunlife',
      'Bảo hiểm tai nạn Sunlife',
      'Bảo hiểm du lịch Liberty',
      'Đầu tư tích luỹ VinaCapital',
      'Trả góp qua Thẻ tín dụng',
    ],
  },
  {
    title: 'HỖ TRỢ KHÁCH HÀNG / NHÀ PHÁT TRIỂN',
    content: [
      'Hotline: 123456789',
      'Email: care@summon.vn',
      'Tổng đài CSKH:',
      '– Thứ 2 – Thứ 7: 08:00 – 22:00',
      '– Chủ nhật: 08:00 – 20:00',
    ],
  },
];
