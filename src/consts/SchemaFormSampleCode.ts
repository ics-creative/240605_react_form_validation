export const SchemaFormSampleCode = `
// フォームのスキーマ
const schema = z.object({
  /** 名前 */
  name: z.string().min(1, { error: "名前を入力してください" }),
  /** 年齢 */
  age: z
    .pipe(
      z.number({ error: "年齢を半角数字で入力してください" }),
      z.int({ error: "年齢を整数で入力してください" }),
    )
    .refine((n) => n >= 12, { error: "年齢を12歳以上で入力してください" }),
  /** メールアドレス */
  email: z
    .union([
      z.email({ error: "メールアドレスの形式で入力してください" }),
      z.literal(""),
    ])
    .optional(),
});

// スキーマから型を生成
type Inputs = z.infer<typeof schema>;

export const SchemaFormSample = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    mode: "onTouched",
    resolver: zodResolver(schema), // 🌟resolverを追加
  });
  const onSubmit = handleSubmit((data) => {
    // フォームの送信処理
  });
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          名前
          <input type="text" {...register("name")} />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>
          年齢
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
          />
        </label>
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label>
          メールアドレス
          <input type="email" {...register("email")} />
        </label>
        {errors.email && (<p>{errors.email.message}</p>)}
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
`;
