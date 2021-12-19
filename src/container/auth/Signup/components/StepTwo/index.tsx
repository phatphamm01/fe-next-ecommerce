import Input from "@container/Auth/components/InputAuth";
import Button from "@design/Button";
import { Formik } from "formik";
import { FC, useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SignupContext } from "../..";

const StepTwoContainer = styled.div`
  ${tw``}
`;
const Form = styled.form`
  ${tw`h-full grid py-10 grid-rows-[260px 1fr]`}
`;
const ButtonContainer = styled.div`
  ${tw`mt-4 text-center grid gap-4`}
`;

interface IStepTwo {}

export interface IDataStepTwo {
  firstName?: string;
  lastName?: string;
  cmnd: string;
}

const StepTwo: FC<IStepTwo> = () => {
  const { data, setData, setStepNumber } = useContext(SignupContext);

  return (
    <Formik
      initialValues={{
        firstName: data?.firstName || "Phát",
        lastName: data?.lastName || "Phạm",
        cmnd: "123456789",
      }}
      // validationSchema={Yup.object().shape({
      //   email: Yup.string()
      //     .email("Must be a valid email")
      //     .max(255)
      //     .required("Please enter your email"),
      //   password: Yup.string()
      //     .min(6, "Password is more than 6 characters")
      //     .max(30, "Username less than 20 characters")
      //     .required("Please enter your password"),
      // })}
      onSubmit={async (payload: IDataStepTwo) => {
        setData?.({ ...data, ...payload });
        setStepNumber?.(3);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        const handleChangeStepOne = () => {
          setData?.({ ...data, ...values });
          setStepNumber?.(1);
        };

        return (
          <StepTwoContainer>
            <Form onSubmit={handleSubmit}>
              <div>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.firstName}
                  touched={touched.firstName}
                />

                <Input
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.lastName}
                  touched={touched.lastName}
                />

                <Input
                  name="cmnd"
                  placeholder="CMND"
                  type="text"
                  value={values.cmnd}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.cmnd}
                  touched={touched.cmnd}
                />
              </div>

              <ButtonContainer>
                <Button variant="container">Tiếp tục</Button>
                <Button
                  type="button"
                  onClick={handleChangeStepOne}
                  variant="text"
                >
                  Quay lại
                </Button>
              </ButtonContainer>
            </Form>
          </StepTwoContainer>
        );
      }}
    </Formik>
  );
};

export default StepTwo;
