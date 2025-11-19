import './customPagination.css'
export default function CustomPagination({ currentPage, setCurrentPage, total = 1000, pageSize = 10 }) {
  return {
    position: ['bottomCenter'],
    current: currentPage,
    total,
    pageSize,
    onChange: (page) => setCurrentPage(page),
    showSizeChanger: false,
    showLessItems: true,
    itemRender: (page, type, originalElement) => {
      if (type === 'page') {
        if ([1, 2, 3, 100].includes(page)) {
          return (
            <span className={page === currentPage ? 'custom-page-active' : 'custom-page'}>
              {page}
              {page !== 100 && page !== 3 ? ' ,' : ''}
            </span>
          );
        }
        if (page === 4) return <span className="custom-page"> </span>;
        return null;
      }

      if (type === 'prev') {
        return (
          <span className="pagination-btn">
            <span className="arrow">{originalElement}</span>
            <span className="label">Previous</span>
          </span>
        );
      }

      if (type === 'next') {
        return (
          <span className="pagination-btn">
            <span className="label">Next</span>
            <span className="arrow">{originalElement}</span>
          </span>
        );
      }

      return originalElement;
    },
  };
}
