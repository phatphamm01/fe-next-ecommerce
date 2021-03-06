import checkNullObject from "@common/function/checkNullObject";
import Button from "@design/Button";
import Select from "@design/Select";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getDistrict, getProvice, getWard } from "@redux/slices/location";
import fetchUser from "@services/user/auth";
import { Formik } from "formik";
import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import * as Yup from "yup";
import { SignupContext } from "..";

const StepTwoContainer = styled.div`
  ${tw``}
`;
const Form = styled.form`
  ${tw`h-full grid py-10 grid-rows-[260px 1fr]`}
`;
const ButtonContainer = styled.div`
  ${tw`mt-4 text-center grid gap-4`}
`;
const InputBox = styled.div`
  ${tw`flex flex-col gap-2`}
`;

interface IStepTwo {}

export interface IDataStepTwo {
  district?: { code: string; name: string };
  province?: { code: string; name: string };
  ward?: { code: string; name: string };
}

const StepTwo: FC<IStepTwo> = () => {
  const dispatch = useAppDispatch();
  const { district, provice, ward } = useAppSelector(
    (state) => state.locationReducers
  );

  const [proviceSelected, setPoviceSelected] = useState<Record<string, any>>();
  const [districtSelected, setDistrictSelected] =
    useState<Record<string, any>>();
  const [wardSelected, setWardSelected] = useState<Record<string, any>>();

  const [clearProvice, setClearProvice] = useState<() => void>();
  const [clearDistrict, setClearDistrict] = useState<() => void>();
  const [clearWard, setClearWard] = useState<() => void>();

  const { data, setData, setStepNumber } = useContext(SignupContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (checkNullObject(district)) {
      dispatch(getProvice());
    }

    if (data?.province) {
      setPoviceSelected(data?.province);
    }
    if (data?.district) {
      setDistrictSelected(data.district);
    }
    if (data?.ward) {
      setWardSelected(data.ward);
    }
  }, []);

  useEffect(() => {
    if (!proviceSelected?.code) return;

    dispatch(getDistrict(proviceSelected?.code));
  }, [proviceSelected]);

  useEffect(() => {
    if (!districtSelected?.code) return;

    dispatch(getWard(districtSelected?.code));
  }, [districtSelected]);

  return (
    <Formik
      initialValues={{
        province: {
          code: "",
          name: "",
        },
        district: {
          code: "",
          name: "",
        },
        ward: {
          code: "",
          name: "",
        },
      }}
      validationSchema={Yup.object().shape({
        province: Yup.object()
          .required("Vui l??ng ch???n t???nh/th??nh ph???")
          .nullable(),
        district: Yup.object().required("Vui l??ng ch???n qu???n/huy???n").nullable(),
        ward: Yup.object().required("Vui l??ng ch???n ph?????ng/x??").nullable(),
      })}
      onSubmit={async (payload: IDataStepTwo) => {
        try {
          setLoading(true);
          setData?.({ ...data, ...payload });
          const { district, province, ward } = payload;
          let params = {
            ...data,
            address: `${ward?.name} - ${district?.name} - ${province?.name}`,
          };
          await fetchUser.signup(params);
          setStepNumber?.(4);
        } catch (error: any) {
          toast.error(error);
        } finally {
          setLoading(false);
        }
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
          setFieldValue,
          setFieldTouched,
        } = props;

        useEffect(() => {
          setFieldValue("province", data?.province, false);
          setFieldValue("district", data?.district, false);
          setFieldValue("ward", data?.ward, false);
        }, []);

        const handleChangeStepTwo = () => {
          setData?.({ ...data, ...values });
          setStepNumber?.(2);
        };

        return (
          <StepTwoContainer>
            <Form onSubmit={handleSubmit}>
              <InputBox>
                <Select
                  name="province"
                  options={provice}
                  defaultValue={data?.province}
                  placeholder="T???nh/Th??nh ph???"
                  onChange={(
                    field: string,
                    value: any,
                    shouldValidate?: boolean | undefined
                  ) => {
                    setFieldValue(field, value, shouldValidate);
                    setPoviceSelected(value);

                    clearDistrict?.();
                    clearWard?.();
                  }}
                  onBlur={setFieldTouched}
                  errors={errors.province}
                  touched={touched.province}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.code}
                  funcClear={setClearProvice}
                />
                <Select
                  name="district"
                  placeholder="Qu???n/ Huy???n"
                  options={district}
                  defaultValue={data?.district}
                  onChange={(
                    field: string,
                    value: any,
                    shouldValidate?: boolean | undefined
                  ) => {
                    setFieldValue(field, value, shouldValidate);
                    setDistrictSelected(value);

                    clearWard?.();
                  }}
                  onBlur={handleBlur}
                  errors={errors.district}
                  touched={touched.district}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.code}
                  funcClear={setClearDistrict}
                />
                <Select
                  name="ward"
                  placeholder="Ph?????ng/ X??"
                  options={ward}
                  defaultValue={data?.ward}
                  onChange={(
                    field: string,
                    value: any,
                    shouldValidate?: boolean | undefined
                  ) => {
                    setFieldValue(field, value, shouldValidate);
                    setWardSelected(value);
                  }}
                  onBlur={handleBlur}
                  errors={errors.ward}
                  touched={touched.ward}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.code}
                  funcClear={setClearWard}
                />
              </InputBox>

              <ButtonContainer>
                <Button disabled={loading} type="submit" variant="container">
                  Ti???p t???c
                </Button>
                <Button
                  type="button"
                  onClick={handleChangeStepTwo}
                  variant="text"
                >
                  Quay l???i
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
