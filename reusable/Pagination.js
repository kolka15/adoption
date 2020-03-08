import React, {Component} from 'react';
import theme from '../utils/styles/theme';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};


class Pagination extends Component {
    constructor(props) {
        super(props);

        const { pageLimit = 6, pageNeighbors = 0 } = props;

        this.pageNeighbors = pageNeighbors;
        this.pageLimit = pageLimit;

        this.state = {
            currentPage: 1,
            totalRecords: 0,
            totalPages: null
        };
    }

    componentDidMount() {
        const totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit);
        this.setState({ totalPages });
        this.setState({totalRecords: this.props.totalRecords}, () => {
            this.gotoPage(this.props.startPage);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.totalRecords !== prevProps.totalRecords) {
            const totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit);
            this.setState({ totalPages });
            this.setState({totalRecords: this.props.totalRecords}, () => {
                this.gotoPage(1);
            });
        }
    }

    fetchPageNumbers = () => {
        const totalPages = this.state.totalPages;
        const { currentPage } = this.state;
        const pageNeighbors = this.pageNeighbors;

        // totalNumbers: the total page numbers to show on the control
        // totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
        const totalNumbers = (pageNeighbors * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbors);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

            let pages = range(startPage, endPage);

            // hasLeftSpill: has hidden pages to the left
            // hasRightSpill: has hidden pages to the right
            // spillOffset: number of hidden pages either to the left or to the right
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            }

            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            }

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    gotoPage = page => {
        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.state.totalPages));

        this.setState({ currentPage }, () => onPageChanged(currentPage));
    };

    handleClick = page => e => {
        e.preventDefault();
        this.gotoPage(page);
    };

    handleMoveLeft = e => {
        e.preventDefault();
        this.gotoPage(this.state.currentPage - (this.pageNeighbors * 2) - 1);
    };

    handleMoveRight = e => {
        e.preventDefault();
        this.gotoPage(this.state.currentPage + (this.pageNeighbors * 2) + 1);
    };

    render() {
        if (!this.state.totalRecords || this.state.totalPages === 1) return null;
        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <nav>
                <ul className='pagination'>
                    {pages.map((page, i) => {
                        if (page === LEFT_PAGE) return (
                            <li key={i} className='page-item'>
                                <a onClick={this.handleMoveLeft} className='page-link' aria-label='Перейти на предыдущую страницу'>
                                    <span>&laquo;</span>
                                    <span className='sr-only'>Previous</span>
                                </a>
                            </li>
                        );

                        if (page === RIGHT_PAGE) return (
                            <li key={i} className='page-item'>
                                <a onClick={this.handleMoveRight} className='page-link' aria-label='Перейти на следующую страницу'>
                                    <span>&raquo;</span>
                                    <span className='sr-only'>Next</span>
                                </a>
                            </li>
                        );

                        if (page === currentPage) return (
                            <li key={i} className='page-item'>
                                <a className='page-link page-link_active'>
                                    {page}
                                </a>
                            </li>
                        );

                        return (
                            <li key={i} className='page-item'>
                                <a onClick={this.handleClick(page)} className='page-link' aria-label={`Перейти на страницу ${page}`}>
                                    {page}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <style jsx>{`
                    .pagination {
                        display: flex;
                        padding-left: 0;
                        list-style: none;
                        border-radius: .25rem;
                        justify-content: center;
                    }
                    .page-link {
                        position: relative;
                        display: inline;
                        padding: 8px 13px;
                        margin-left: -1px;
                        line-height: 1.25;
                        color: #333;
                        background: #f7f7f7;
                        font-family: "Roboto Condensed", sans-serif;
                    }
                    .page-link:hover,
                    .page-link:active {
                        color: ${theme.colors.blue.plain};
                        background: #eee;
                        cursor: pointer;
                    }
                    .page-link_active,
                     .page-link_active:hover,
                     .page-link_active:active {
                        color: #fff;
                        background: ${theme.colors.lavender.darkest};
                    }
                    .sr-only {
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        padding: 0;
                        overflow: hidden;
                        clip: rect(0,0,0,0);
                        white-space: nowrap;
                        clip-path: inset(50%);
                        border: 0;
                    }
                `}</style>
            </nav>
        );
    }
}

export default Pagination;
