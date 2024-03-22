type QuestionHeaderProps = {
  title: string;
  subTitle: string;
};
export function QuestionHeader({
  title = 'Default Title',
  subTitle = 'Default Subtitle',
}: QuestionHeaderProps) {
  return (
    <div className='mb-10'>
      <p className='text-black font-bold text-3xl md:text-4xl mb-5 md:mb-2'>
        {title}
      </p>
      <p className='text-gray-700 text-base'>{subTitle}</p>
    </div>
  );
}
