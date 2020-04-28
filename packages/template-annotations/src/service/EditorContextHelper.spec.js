import EditorContextHelper from './EditorContextHelper';
import '../../mock/mgnlRefresh.mock';

describe('EditorContext', () => {
    it('inEditor is true', () => {
        // GIVEN
        // WHEN
        let isInEditor = EditorContextHelper.inEditor();
        // THEN
        expect(isInEditor).toEqual(true);
    });

    it('inEditor is false', () => {
        // GIVEN
        window.frameElement = null;
        // WHEN
        let isInEditor = EditorContextHelper.inEditor();
        // THEN
        expect(isInEditor).toEqual(false);
    });
});