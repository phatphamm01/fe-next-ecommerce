import tw from 'twin.macro';
import Image from 'next/image';
import Button from 'design/Button';
import LinkNext from 'design/Link';

const BannerContainer = tw.section`
  h-[628px] bg-red-100 mt-3
`;
const BannerMain = tw.div`h-full container mx-auto  grid lg:grid-cols-2  px-10 md:px-32 lg:px-0 items-center`;

const ImageContainer = tw.div`hidden lg:block text-center`;
const ContentContainer = tw.div`w-[100%] xl:w-[540px]`;
const HighlightTextFirst = tw.h2`text-4xl sm:text-5xl font-bold text-red-600 mb-2`;
const HighlightTextSecond = tw.h2`pl-16 text-4xl sm:text-5xl font-bold text-red-400 mb-4`;
const Description = tw.p`mb-6 text-gray-900 font-light`;

const ButtonContainer = tw.div`text-center`;

const Banner = () => {
  return (
    <BannerContainer>
      <BannerMain>
        <ImageContainer>
          <Image
            height={(400 * 547) / 588}
            width={400}
            src="/img/tmdt.png"
            alt="Ảnh minh họa heo đất"
          />
        </ImageContainer>
        <ContentContainer>
          <HighlightTextFirst>Tiền tăng tiền tăng</HighlightTextFirst>
          <HighlightTextSecond>Nhanh tay đăng kí</HighlightTextSecond>
          <Description>
            Bạn còn đang lo lắng về số dư trong tài khoản của mình mà không biết
            nên làm gì với chúng. Hãy đến với chúng tôi để ring ngay những phần
            quà hấp dẫn và nhiều ưu đãi khác
          </Description>
          <ButtonContainer>
            <LinkNext href="/login">
              <Button variant="container">Đăng kí ngay</Button>
            </LinkNext>
          </ButtonContainer>
        </ContentContainer>
      </BannerMain>
    </BannerContainer>
  );
};

export default Banner;
