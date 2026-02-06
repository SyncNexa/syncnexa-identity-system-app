function renderComponent(data: Array<Record<string, string>>) {
  return data.map((item, i) => {
    switch (item.type) {
      case "heading":
        return <h4 key={i}>{item.text}</h4>;
      case "paragraph":
        return <p key={i}>{item.text}</p>;
      case "small":
        return <small key={i}>{item.text}</small>;
    }
  });
}

export default renderComponent;
