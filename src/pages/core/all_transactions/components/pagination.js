export const Pagination = (props) => {
  const pagination = props.pagination;
  const changepageno = props.changepageno;

  return (
    <div className="pages">
      {pagination.pageno - 1 >= 1 && (
        <>
          <div className="page" onClick={() => changepageno(1)}>
            <span>First-page</span>
          </div>
          <div
            className="page"
            onClick={() => changepageno(pagination.pageno - 1)}
          >
            <span>Prev</span>
          </div>
        </>
      )}

      {pagination.pageno + pagination.showPage < pagination.totalpage ? (
        <>
          {pagination.pages
            .slice(
              pagination.pageno - 1,
              pagination.pageno - 1 + pagination.showPage
            )
            .map((pageno, index) =>
              pagination.pageno === pageno ? (
                <div
                  className="page animate1page"
                  key={index}
                  onClick={() => changepageno(pageno)}
                >
                  <span>{pageno}</span>
                </div>
              ) : (
                <div
                  className="page"
                  key={index}
                  onClick={() => changepageno(pageno)}
                >
                  <span>{pageno}</span>
                </div>
              )
            )}

          <div className="page">
            <span>...</span>
          </div>
        </>
      ) : (
        <>
          {pagination.pages
            .slice(pagination.pageno - 1, pagination.totalpage - 1)
            .map((pageno, index) =>
              pagination.pageno === pageno ? (
                <div
                  className="page animate1page"
                  key={index}
                  onClick={() => changepageno(pageno)}
                >
                  <span>{pageno}</span>
                </div>
              ) : (
                <div
                  className="page"
                  key={index}
                  onClick={() => changepageno(pageno)}
                >
                  <span>{pageno}</span>
                </div>
              )
            )}
          {pagination.pageno !== pagination.totalpage && (
            <div className="page">
              <span>...</span>
            </div>
          )}
        </>
      )}

      {pagination.pageno + 1 <= pagination.totalpage && (
        <>
          <div
            className="page"
            onClick={() => changepageno(pagination.pageno + 1)}
          >
            <span>Next</span>
          </div>
          <div
            className="page"
            onClick={() => changepageno(pagination.totalpage)}
          >
            <span>Last-page</span>
          </div>
        </>
      )}
    </div>
  );
};
