import {resolve, dirname} from 'path';

const isValidUrl = string => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

export default function ({types: t}) {
    return {
        visitor: {
            ObjectProperty(path, state) {

                if (t.isIdentifier(path.node.key, {name: 'templateUrl'}))
                    if (t.isStringLiteral(path.node.value)) {

                        const {baseDir, baseUrl} = state.opts;
                        const dir = dirname(state.file.opts.filename);
                        const templateUrl = path.node.value.value;

                        if (!isValidUrl(templateUrl)) {
                            const absolutePath = resolve(dir, templateUrl);
                            const url = baseUrl + absolutePath.replace(resolve(baseDir), '');

                            path.node.value = t.stringLiteral(url);
                        }
                    }
            }
        }
    };
};