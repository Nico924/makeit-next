import cloneDeep from 'lodash/cloneDeep';

interface OptionProps {
  languages: string[];
  whitelistedContentKeys?: string[];
  whitelistedCmsPages?: string[];
  blacklistedCmsPages?: string[];
  keyNewContent?: string;
  arrayAsObject?: boolean;
}

class TreatmentContent {
  pages: object[];

  options: OptionProps = {
    languages: ['en', 'fr', 'nl'],
    whitelistedContentKeys: ['position', 'label', 'link', 'url', 'value', 'type', 'src'],
    keyNewContent: '_NEW',
    arrayAsObject: false,
  };

  constructor(pages: object[], options: OptionProps) {
    // make sure to have json
    for (let i = 0; i < pages.length; i += 1) {
      const item = pages[i];
      item.content = typeof item.content === 'string' ? JSON.parse(item.content) : item.content;
    }
    this.pages = pages;

    this.options = {
      ...this.options,
      ...options,
    };
  }

  treatmentContent = (
    content: object,
    parentContent: object,
    parentType: string,
    lg: string,
  ): void => {
    const keys = Object.keys(content);
    keys.forEach((key): void => {
      if (key === this.options.keyNewContent) return;

      const elem = content[key];
      const currentContent = elem.content || elem;

      if (!currentContent) return;

      if (elem.type === 'Object') {
        // Mode where we keep list as array
        if (!this.options.arrayAsObject && parentType && parentType === 'Array') {
          const newObj = {};
          parentContent.push(newObj);
          this.treatmentContent(currentContent, newObj, undefined, lg);
        } else {
          let label = key;
          // Mode where list are handled as object
          if (parentType && parentType === 'Array' && elem.label) {
            label = elem.label;
          }
          parentContent[label] = {};
          if (elem.position) {
            parentContent[label].position = parseInt(elem.position, 10);
          }
          this.treatmentContent(currentContent, parentContent[label], undefined, lg);
        }
      } else if (elem.type === 'Array') {
        if (!this.options.arrayAsObject) {
          parentContent[key] = [];
        } else {
          parentContent[key] = {};
        }

        this.treatmentContent(currentContent, parentContent[key], 'Array', lg);
      } else if (elem.type === 'img') {
        parentContent[key] = {
          src: elem.src,
        };
      } else {
        const newObj = parentContent[key] ? cloneDeep(parentContent[key]) : {};

        const subKeys = Object.keys(elem);
        subKeys.forEach((subKey): void => {
          if (['content', 'alt', 'label'].indexOf(subKey) < 0) {
            if (this.options.whitelistedContentKeys?.indexOf(subKey) < 0) return;

            newObj[subKey] = elem[subKey];
            // parse number
            if (elem[subKey] && typeof elem[subKey] === 'number') {
              newObj[subKey] = parseInt(elem[subKey], 10);
            }
          } else if (subKey === 'label') {
            if (parentType === 'Array' && !newObj.value) {
              newObj.value = elem[subKey];
            }
            if (this.options.whitelistedContentKeys?.indexOf(subKey) < 0) return;

            newObj[subKey] = elem[subKey];
          }
        });
        // attach content and alt (if present)
        const langKeys = Object.keys(currentContent);
        langKeys.forEach((langKey): void => {
          if (lg && langKey?.indexOf(lg) < 0) return;

          newObj[langKey] = currentContent[langKey];
        });
        // attach alt object to image
        if (elem.alt) {
          newObj.alt = {};
          const altKeys = Object.keys(currentContent);
          altKeys.forEach((altKey): void => {
            if (lg && altKey.indexOf(lg) < 0) return;

            newObj[altKey] = currentContent[altKey];
          });
        }

        // Attaching new content to the parent
        if (parentType && parentType === 'Array') {
          if (!this.options.arrayAsObject) {
            parentContent.push(newObj);
          } else {
            const label = newObj.label || key;
            parentContent[label] = newObj;
          }
        } else {
          parentContent[newObj.dataKey || key] = newObj;
        }
      }
    });
  };

  treatmentPage = (page: object, language: string): object => {
    const newContent = {};

    if (page) this.treatmentContent(page, newContent, undefined, language);

    return newContent;
  };

  public treatmentPages = (targetLg: string): object[] => {
    const output = {};

    for (let i = 0; i < this.pages.length; i += 1) {
      const item = this.pages[i];

      const key = item.key || item.title || item.label;

      if (this.options.whitelistedCmsPages && this.options.whitelistedCmsPages.indexOf(key) < 0)
        continue;

      if (this.options.blacklistedCmsPages && this.options.blacklistedCmsPages.indexOf(key) >= 0)
        continue;

      output[key] = this.treatmentPage(item.content, targetLg);
    }

    return output;
  };

  getAllTreatments = (): object => {
    const output = {};

    for (let i = 0; i < this.options.languages.length; i += 1) {
      const lg = this.options.languages[i];

      output[lg] = this.treatmentPages(lg);
    }
    output.all = this.treatmentPages();

    return output;
  };
}

export default TreatmentContent;
