const testHierarchy = require('./helper');

const DEFAULT_HIERARCHY = {
    atoms: 0,
    molecules: 1,
    organisms: 2,
    templates: 3,
    pages: 4
};

const DEFAULT_COMPONENTS_FOLDER = 'components';

module.exports.rules = {
    "hierarchical-import": {
        meta: {
            schema: [
                {
                    "type": "object",
                    "additionalProperties": true
                },
                {
                    "type": "string"
                }
            ]
        },
        create: context =>
            ({
                ImportDeclaration: ( node ) => {
                    const hierarchy = context.options[0] || DEFAULT_HIERARCHY;
                    const fn = context.getFilename();
                    const componentFolder = context.options[1] || DEFAULT_COMPONENTS_FOLDER;
                    const error = testHierarchy(fn, node.source.value, hierarchy, componentFolder);
                    if(error) {
                        context.report(node, error);
                    }
                }
            })
    }
};
