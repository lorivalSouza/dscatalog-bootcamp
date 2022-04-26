import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router, useParams } from "react-router-dom";
import selectEvent from "react-select-event";
import { ToastContainer } from "react-toastify";
import history from "util/history";
import Form from "../Form";
import { server } from "./fixtures";

beforeAll(() =>
    server.listen()
);

afterEach(() =>
    server.resetHandlers
);

afterAll(() =>
    server.close()
);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));


describe('Product form create tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    });

    test('Should show toast and redirect when submit form correctly', async () => {
        //ARRANGE
        //ACTION
        //ASSERT
    
        //ARRANGE to Text = FAZER LOGIN
        const text = "Catálago de produtos";
    
        //ACTION
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        )
    
        const nameInput =  screen.getByTestId("name");
        const priceInput =  screen.getByTestId("price");
        const imgURLInput =  screen.getByTestId("imgURL");
        const descriptionInput =  screen.getByTestId("description");

        const CategoriesInput = screen.getByLabelText("Categorias");

        const submitButton = screen.getByRole('button', {name: /salva/i});

        await selectEvent.select(CategoriesInput, ['Eletrônicos']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5124.25');
        userEvent.type(imgURLInput, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3AQuality_images&psig=AOvVaw1m4nRKZ-wWOhRuwCXg4J6i&ust=1650459275212000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMjxnYqWoPcCFQAAAAAdAAAAABAD');
        userEvent.type(descriptionInput, 'ComputadorComputadorComputadorComputadorComputadorComputadorComputadorComputadorComputadorComputador');
        userEvent.click(submitButton);

        await waitFor(() => {
            const toastElement = screen.getByText('Produto cadastrado com sucesso.');
            expect(toastElement).toBeInTheDocument();

        });

        expect(history.location.pathname).toEqual('/admin/products');

        
    
    });
});


