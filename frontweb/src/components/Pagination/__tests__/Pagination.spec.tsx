import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "..";

describe('Pagination tests', () => {

    test('should render pagination', () => {
        //ARRANGE
        //ACTION
        //ASSERT

        //ARRANGE
        const pageCount = 3;
        const range = 3;


        //ACTION
        render(
            <Pagination pageCount={pageCount} range={range} />
        );

        //screen.debug();

        //ASSERT
        const page1 = screen.getByText("1");
        const page2 = screen.getByText("2");
        const page3 = screen.getByText("3");
        const page4 = screen.queryByText("4");

        expect(page1).toBeInTheDocument;
        expect(page1).toHaveClass("pagination-link-active");

        expect(page2).toBeInTheDocument;
        expect(page2).not.toHaveClass("pagination-link-active");

        expect(page3).toBeInTheDocument;
        expect(page3).not.toHaveClass("pagination-link-active");

        expect(page4).not.toBeInTheDocument;



    });


    test('next arrow should call onChange', () => {
        //ARRANGE
        //ACTION
        //ASSERT

        //ARRANGE
        const pageCount = 3;
        const range = 3;
        const onChange = jest.fn();


        //ACTION
        render(
            <Pagination 
            pageCount={pageCount} 
            range={range}
            onChange={onChange} />
        );

        
        //screen.debug();

        //ASSERT
        const arrowNext = screen.getByTestId("arrow_next");
        //const arrowPrevious = screen.getByTestId("arrow_previous");

        userEvent.click(arrowNext);
        expect(onChange).toHaveBeenCalledWith(1);


    });

    test('arrow_previous should call onChange', () => {
        //ARRANGE
        //ACTION
        //ASSERT

        //ARRANGE
        const pageCount = 3;
        const range = 3;
        const onChange = jest.fn();
        const forcePage = 1;


        //ACTION
        render(
            <Pagination 
            pageCount={pageCount} 
            range={range}
            onChange={onChange}
            forcePage = {forcePage} />
        );

        
        //screen.debug();

        //ASSERT
        const arrowPrevious = screen.getByTestId("arrow_previous");
        //const arrowPrevious = screen.getByTestId("arrow_previous");

        userEvent.click(arrowPrevious);
        expect(onChange).toHaveBeenCalledWith(0);


    });

    test('page link should call onChange', () => {
        //ARRANGE
        //ACTION
        //ASSERT

        //ARRANGE
        const pageCount = 3;
        const range = 3;
        const onChange = jest.fn();


        //ACTION
        render(
            <Pagination 
            pageCount={pageCount} 
            range={range}
            onChange={onChange} />
        );

        
        //screen.debug();

        //ASSERT
        const page2 = screen.getByText("2");

        userEvent.click(page2);
        expect(onChange).toHaveBeenCalledWith(1);


    });


});