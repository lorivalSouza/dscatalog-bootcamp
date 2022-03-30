import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import Catalog from "..";
import history from "util/history";

describe('Pagination tests', () => {


    test('Catalog should render with products', async () => {
        //ARRANGE
        //ACTION
        //ASSERT

        //ARRANGE to Text = FAZER LOGIN
        const text = "Catálago de produtos";

        //ACTION
        render(
            <Router history={history}>
                <Catalog />
            </Router>
        )

        //screen.debug();

        //ASSERT
        expect(screen.getByText(text)).toBeInTheDocument();

        await waitFor( () => {
            expect(screen.getByText("The Lord of the Rings")).toBeInTheDocument;
        });
    });

});