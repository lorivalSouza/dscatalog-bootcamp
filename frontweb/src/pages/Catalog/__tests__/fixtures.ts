import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from 'util/requests';

const findAllResponse = {
    content: [
        {
            id: 10,
            name: "PC Gamer Y",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: 1700.0,
            imgURL: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/10-big.jpg",
            date: "2020-07-14T10:00:00Z",
            categories: [
                {
                    "id": 3,
                    "name": "Computadores"
                }
            ]
        },
        {
            id: 7,
            name: "PC Gamer X",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: 1350.0,
            imgURL: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/7-big.jpg",
            date: "2020-07-14T10:00:00Z",
            categories: [
                {
                    "id": 3,
                    "name": "Computadores"
                }
            ]
        },
        {
            id: 15,
            name: "PC Gamer Weed",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: 2200.0,
            imgURL: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/15-big.jpg",
            date: "2020-07-14T10:00:00Z",
            categories: [
                {
                    "id": 3,
                    "name": "Computadores"
                }
            ]
        },
        {
            id: 21,
            name: "PC Gamer Tx",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: 1680.0,
            imgURL: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/21-big.jpg",
            date: "2020-07-14T10:00:00Z",
            categories: [
                {
                    "id": 3,
                    "name": "Computadores"
                }
            ]
        },
        {
            id: 17,
            name: "PC Gamer Turbo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: 1280.0,
            imgURL: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/17-big.jpg",
            date: "2020-07-14T10:00:00Z",
            categories: [
                {
                    "id": 3,
                    "name": "Computadores"
                }
            ]
        }
    ],
    pageable: {
        sort: {
            sorted: true,
            unsorted: false,
            empty: false
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 5,
        paged: true,
        unpaged: false
    },
    last: false,
    totalElements: 21,
    totalPages: 5,
    size: 5,
    number: 0,
    sort: {
        sorted: true,
        unsorted: false,
        empty: false
    },
    first: true,
    numberOfElements: 5,
    empty: false
};

export const server = setupServer(
    // Describe the requests to mock.
    rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(findAllResponse)
        );
    })
);

