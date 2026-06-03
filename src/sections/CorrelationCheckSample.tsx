import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const dateSchema = z
  .object({
    startDate: z.iso.date({ error: "日付を入力してください" }),
    endDate: z.iso.date({ error: "日付を入力してください" }),
  })
  .refine((arg) => new Date(arg.startDate) < new Date(arg.endDate), {
    error: "終了日は開始日より後の日付を入力してください",
    path: ["endDate"],
  });

const schema = z.object({
  title: z.string().min(1, { error: "タイトルを入力してください" }),
  date: dateSchema,
});

// スキーマから型を生成
type Inputs = z.infer<typeof schema>;

/**
 * 相関チェックのサンプルです
 */
export const CorrelationCheckSample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.alert(
      `タイトル：${data.title}\n日付：${data.date.startDate}~${data.date.endDate}`,
    );
  };
  return (
    <form className="box" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">タイトル</label>
        <div className="control">
          <input className="input" type="text" {...register("title")} />
        </div>
        {errors.title && (
          <p className="help is-danger">{errors.title.message}</p>
        )}
      </div>
      <div className="field">
        <label className="label">開始日</label>
        <div className="control">
          <input
            className="input"
            type="date"
            {...register("date.startDate")}
            onBlur={() => {
              if (getValues("date.endDate") !== "") {
                trigger("date.endDate");
              }
            }}
          />
        </div>
        {errors.date?.startDate && (
          <p className="help is-danger">{errors.date.startDate?.message}</p>
        )}
      </div>
      <div className="field">
        <label className="label">終了日</label>
        <div className="control">
          <input className="input" type="date" {...register("date.endDate")} />
        </div>
        {errors.date?.endDate && (
          <p className="help is-danger">{errors.date.endDate.message}</p>
        )}
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link" type="submit">
            submit
          </button>
        </div>
      </div>
    </form>
  );
};
