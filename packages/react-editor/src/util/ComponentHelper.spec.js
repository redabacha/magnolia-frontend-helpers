import React from 'react';
import ComponentHelper from './ComponentHelper';
import { LoggerService } from '@magnolia/template-annotations';
import page from '../../mock/page';
import getComponentPropertiesJsonResult from '../../mock/expected-result/getComponentProperties';

describe('Test ComponentHelper', () => {
    let componentMapping;
    beforeEach(() => {
        componentMapping = {
            'sample-light-module:components/title': () => (<div />),
            'sample-light-module:components/text-image': () => (<div />),
            'sample-light-module:components/nested': () => (<div />),
            'sample-light-module:components/navigation': () => (<div />),
            'sample-light-module:pages/standard': () => (<div />)
        };
    });
    it('getRenderedComponent', () => {
        // GIVEN
        const area = page.main;
        const nestedComponentContent = area['0'];
        // WHEN
        const pageComponent = ComponentHelper.getRenderedComponent(page, componentMapping);
        const nestedComponent = ComponentHelper.getRenderedComponent(nestedComponentContent, componentMapping);

        // THEN
        expect(pageComponent).toBeDefined();
        expect(nestedComponent).toBeDefined();
    });

    it('getComponentProperties', () => {
        // GIVEN
        const expectedResult = getComponentPropertiesJsonResult;

        // WHEN
        const result = ComponentHelper.getComponentProperties(page);

        // THEN
        expect(result).toMatchObject(expectedResult);
    });

    it('getComponentProperties with null content', () => {
        // GIVEN
        const expectedResult = {};

        // WHEN
        const result = ComponentHelper.getComponentProperties(null);

        // THEN
        expect(result).toMatchObject(expectedResult);
    });

    it('addComment', () => {
        // GIVEN
        const div = document.createElement('div');
        const openComment = 'open comment';
        const closeComment = 'close comment';

        // WHEN
        ComponentHelper.addComment(div, openComment, closeComment);

        // THEN
        expect(div.firstChild.textContent).toEqual(openComment);
        expect(div.lastChild.textContent).toEqual(closeComment);
    });

    it('test classnames', () => {
        // GIVEN
        const expectedResult = 'class1 class2 class4 class5';
        // WHEN
        const result = ComponentHelper.classnames('class1', [{ class2: true, class3: false }, 'class4'], { class5: true });
        // THEN
        expect(result).toEqual(expectedResult);
    });

    it('it should print an error in the console', () => {
        // GIVEN
        LoggerService.error = jest.fn();
        const componentContent = { 'mgnl:template': 'foo:components/bar' };
        // WHEN
        ComponentHelper.getRenderedComponent(componentContent, componentMapping);
        // THEN
        expect(LoggerService.error).toHaveBeenLastCalledWith('Component with ID foo:components/bar is not mapped.');
    });
});
