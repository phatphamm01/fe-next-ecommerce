import Image from "next/image";
import Button from "design/Button";
import LinkNext from "design/Link";
import styled from "styled-components";
import tw from "twin.macro";

const BannerContainer = styled.section`
  ${tw`h-[628px] bg-red-100 mt-3`}
`;
const BannerMain = styled.div`
  ${tw`h-full container mx-auto grid grid-cols-2 lg:grid-cols-1 lg:px-32 md:px-10 items-center`}
`;
const ImageContainer = styled.div`
  ${tw`lg:hidden block text-center`}
`;
const ContentContainer = styled.div`
  ${tw`xl:w-[100%] w-[540px]`}
`;
const HighlightTextFirst = styled.h2`
  ${tw`sm:text-4xl text-5xl font-bold text-red-600 mb-2`}
`;
const HighlightTextSecond = styled.h2`
  ${tw`pl-16 sm:text-4xl text-5xl font-bold text-red-400 mb-4`}
`;
const Description = styled.p`
  ${tw`mb-6 text-gray-900 font-light`}
`;
const ButtonContainer = styled.div`
  ${tw`mx-auto w-[200px]`}
`;

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
            <Button variant="container">
              <LinkNext href="/signup">Đăng kí ngay</LinkNext>
            </Button>
          </ButtonContainer>
        </ContentContainer>
      </BannerMain>
    </BannerContainer>
  );
};

export default Banner;
