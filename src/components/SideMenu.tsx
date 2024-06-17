function SideMenu() {
  const menuItems = [
    {
      link: "/overview",
      text: "Overview",
    },
    {
      link: "/expenditure",
      text: "Expenditures",
    },
    {
      link: "/income",
      text: "Income",
    },
  ];

  return (
    <div className="basis-2/12 bg-black h-screen flex flex-col gap-y-8 text-white px-5 py-6 font-semibold">
      {menuItems.map((m, i) => (
        <a href={m.link} key={i}>
          {m.text}
        </a>
      ))}
    </div>
  );
}

export default SideMenu;
