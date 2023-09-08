interface Props {
  required?: boolean;
}

export default function Required({ required }: Props): JSX.Element | null {
  if (required) {
    return <span className="text-red-500"> *</span>;
  }
  return null;
}
