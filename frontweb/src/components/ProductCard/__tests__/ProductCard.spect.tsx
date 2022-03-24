import { render, screen } from "@testing-library/react";
import { Product } from "types/product";
import ProductCard from "..";


//ARRANGE
//ACTION
//ASSERT
    

      test('should render ProductCard with given text R$ and price separated by comma and two decimal places', () => {
        const product : Product = {"id":1,
        "name":"The Lord of the Rings",
        "price":90.5,
        "imgURL":"https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg"        
        } as Product
        render(
          <ProductCard product={product} />
        )

        expect(screen.getByText('R$')).toBeInTheDocument();
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByAltText(product.name)).toBeInTheDocument();
        expect(screen.getByText("90,50")).toBeInTheDocument();


});