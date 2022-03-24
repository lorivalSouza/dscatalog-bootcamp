import { render, screen } from "@testing-library/react";
import ProductPrice from "..";


//ARRANGE
//ACTION
//ASSERT
    

      test('should render ProductPrice with given text R$ and price separated by comma and two decimal places', () => {
        const price = 10.25
        render(
            <ProductPrice price= {price} />
        )

        expect(screen.getByText('R$')).toBeInTheDocument();
        expect(screen.getByText("10,25")).toBeInTheDocument();


});