import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Exam from '../pages/Exam';

describe('Exam Component', () => {
    test('render question and submit answer', async () => {
        const { getByText, getByLabelText, getByRole } = render(<Exam />);

        //Check if questions are rendered
        expect(getByText('Score : 0')).toBeInTheDocument();
        expect(getByText('Average Score : 0')).toBeInTheDocument();

        // Answer the question
        // for (let i = 1; i <= 5; i++) {
        //     fireEvent.click(getByLabelText(`Yes`));
        //     fireEvent.click(getByLabelText(`No`));
        // }


        // Submit form
        fireEvent.submit(getByRole('button', { name: 'Submit' }));

        // Wait and finish
        await waitFor(() => {
            // Check if scores are updated
            expect(getByText('Score : 0')).toBeInTheDocument();  // List of question 5
            expect(getByText('Average Score : 0')).toBeInTheDocument(); // First submission
        });
    });

});