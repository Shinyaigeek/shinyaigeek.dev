interface Props {
  prev: number | false;
  next: number | false;
}

export function Pagenation(props: Props) {
  return (
    <div className="pagination--wrapper">
      {props.prev && (
        <a id="prev" className="pagination" href={`/?page=${props.prev}`}>
          &lt; prev
        </a>
      )}
      {props.next && (
        <a id="next" className="pagination" href={`/?page=${props.next}`}>
          next &gt;
        </a>
      )}
    </div>
  );
}
