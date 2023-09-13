import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

/** 表單資料 */
type FormData = Record<string, any>;

/** useForm Config */
type FormConfig<D extends FormData> = {
  [K in keyof D]: {
    initialValue: D[K];
    validate: ValidateFunc<D, K>;
  };
};

/** 檢核 Function */
interface ValidateFunc<D extends FormData, TField extends keyof D> {
  (params: ValidateFuncParams<D, TField>): Record<string, any>;
}

/** 檢核 Function 參數 */
type ValidateFuncParams<D extends FormData, TField extends keyof D> = {
  data: D;
  field: TField;
  value: D[TField];
};

/** 檢核錯誤物件類型 */
type ValidatorError = Record<string, any>;

/** 檢核器 */
type Validator<D extends FormData> = {
  [K in keyof D]: {
    errors: ValidatorError;
    isValid: boolean;
  };
};

/**
 * useForm
 * @param formConfig form 的設定參數
 */
export function useForm<T extends FormData>(formConfig: FormConfig<T>) {
  /** Form Config */
  const [_formConfig] = useState(formConfig);
  /** Form Data */
  const [formData, setFormData] = useState<T>(
    Object.keys(formConfig).reduce(
      (result, field) => ({
        ...result,
        [field]: formConfig[field].initialValue,
      }),
      {} as T,
    ),
  );

  /** Dirty Fields */
  const [dirtyFields, setDirtyFields] = useState<string[]>([]);

  /** Validator */
  const [validator, setValidator] = useState(() =>
    Object.keys(formConfig).reduce(
      (result, field) => ({
        ...result,
        [field]: {
          isValid: true,
          errors: {},
        },
      }),
      {} as Validator<T>,
    ),
  );
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  /**
   * 更新 FormData
   * @param partialData 欲更新的部分 FormData 資料
   */
  const updateFormData = (partialData: Partial<T>) => {
    const fields = Object.keys(partialData);
    const newFormData = { ...formDataRef.current, ...partialData };

    setFormData(newFormData);
    setDirtyFields(_.uniq([...dirtyFields, ...fields]));
  };

  /** 檢核所有欄位 */
  const validateAll = useCallback(() => {
    const fields = Object.keys(validator);
    const newValidator = fields.reduce((result, field) => {
      const errors = _formConfig[field].validate({
        data: formDataRef.current,
        field,
        value: formDataRef.current[field],
      });
      return {
        ...result,
        [field]: {
          errors,
          isValid: _.isEmpty(errors),
        },
      };
    }, {} as Validator<T>);

    setDirtyFields(fields);

    return {
      /** Validator */
      validator: newValidator,
      /** 是否通過檢核 */
      isValid: fields.every((field) => newValidator[field].isValid),
    };
  }, []);

  /** 清空檢核 */
  const clearValidation = useCallback(() => {
    const newValidator = Object.keys(formDataRef.current).reduce(
      (result, field) => ({
        ...result,
        [field]: {},
      }),
      {} as Validator<T>,
    );
    setValidator(newValidator);
    setDirtyFields([]);
  }, []);
  /** 檢核 dirty fields，更新 validator */
  useEffect(() => {
    if (dirtyFields.length > 0) {
      const dirtyValidator = dirtyFields.reduce((result, field) => {
        const errors = _formConfig[field].validate({ data: formData, field, value: formData[field] });
        return {
          ...result,
          [field]: {
            errors,
            isValid: _.isEmpty(errors),
          },
        };
      }, {} as Validator<T>);
      setValidator({ ...validator, ...dirtyValidator });
    }
  }, [dirtyFields]);

  return {
    formData,
    validator,
    updateFormData,
    validateAll,
    clearValidation,
  };
}
