interface PorpsType {
  badgeText: string;
}

function Badge({ badgeText }: PorpsType) {
  return (
    <p className="dark:text-primary dark:border-primary rounded-md border border-gray-600 px-2 ">
      {badgeText}
    </p>
  );
}

export default Badge;
