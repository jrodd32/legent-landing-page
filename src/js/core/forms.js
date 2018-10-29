import { randomId } from './utilities';

const form = {
  data() {
    return {
      isSubmitting: false,
      isValid: false,
      notification: {
        message: '',
        status: 200,
        withClose: true
      },
      randomId: randomId(),
      submitButton: 'Submit'
    };
  },
  computed: {
    canSubmit() {
      return this.hasValidFields && this.requiredFieldsCount === this.validatedFieldsCount;
    },
    fields() {
      return this.randomId.length > 0 && this.findComponents(this.$refs.form, [], 'legent-input');
    },
    fieldKeys() {
      // field.field returns the field_name prop passed
      return this.fields.map(field => field.field);
    },
    hasMatchingFields() {
      return this.matches.length > 0 && this.targets.length > 0;
    },
    hasValidFields() {
      return this.fields.filter(field => field.isInvalid).length === 0;
    },
    isDisabled() {
      return !this.isValid || this.isSubmitting;
    },
    matches() {
      return this.fields.filter(field => field.match === true);
    },
    targets() {
      return this.fields.filter(field => field.target === true);
    },
    requiredFields() {
      return this.fields.filter(field => field.required === true);
    },
    requiredFieldsCount() {
      return this.requiredFields.length;
    },
    submitButtonText() {
      return this.isSubmitting ? 'Please wait...' : this.submitButton;
    },
    validatedFields() {
      return this.requiredFields.filter(field => field.validated === true);
    },
    validatedFieldsCount() {
      return this.validatedFields.length;
    }
  },
  methods: {
    checkValidation() {
      this.$nextTick(() => {
        if (this.hasMatchingFields && this.matches[0].value !== this.targets[0].value) {
          this.matches[0].setError(`Must match ${this.targets[0].humanName}`);
        }

        this.isValid = this.canSubmit;
      });
    },
    clearFields() {
      this.fields.map(field => field.resetField());
    },
    findComponents(startingComponent, componentArray, target) {
      if (startingComponent === undefined) {
        return componentArray;
      }

      if (startingComponent.$options._componentTag === target) {
        componentArray.push(startingComponent);
      }

      startingComponent.$children.forEach((childComponent) => {
        this.findComponents(childComponent, componentArray, target);
      });

      return componentArray;
    },
    findField(key) {
      return this.fields.find(field => field.field === key);
    },
    handleFormClose() {
      this.notification = {
        message: '',
        status: 200,
        withClose: true
      };

      return this.notification;
    },
    setErrors(errors = {}) {
      if (errors && Object.keys(errors).length > 0) {
        this.fieldKeys.forEach((key) => {
          if (errors[key]) {
            this.findField(key).setError(errors[key].join(', '));
          }
        });
      }
    },
    getFormData() {
      const formData = {};

      // add component-based fields
      this.fields.forEach((field) => {
        // field.field returns the field_name prop
        // field.value returns current field value
        formData[field.field] = field.value;
      });

      return formData;
    },
    updateRandomId() {
      this.randomId = randomId();
    }
  }
};

const formSections = {
  data() {
    return {
      fieldsBySection: {},
      currentSection: 0,
      sectionValid: false
    };
  },
  mounted() {
    this.fieldsBySection = this.setSectionFields();

    if (this.sections.length) {
      this.sections[this.currentSection].isActive = true;
    }
  },
  computed: {
    canSubmitSection() {
      return this.sectionHasValidFields && this.sectionRequiredFieldsCount === this.sectionValidatedFieldsCount;
    },
    sections() {
      return this.findComponents(this.$refs.form, [], 'base-form-section');
    },
    isSectionDisabled() {
      return !this.sectionValid;
    },
    sectionHasMatchingFields() {
      return this.sectionMatches.length > 0 && this.sectionTargets.length > 0;
    },
    sectionHasValidFields() {
      return this.fields.filter(field => field.isInvalid).length === 0;
    },
    sectionMatches() {
      return this.sectionFields.filter(field => field.match === true);
    },
    sectionTargets() {
      return this.sectionFields.filter(field => field.target === true);
    },
    sectionFields() {
      return this.fieldsBySection[this.currentSection];
    },
    sectionFieldKeys() {
      // field.field returns the field_name prop passed
      return this.sectionFields.map(field => field.field);
    },
    sectionRequiredFields() {
      return this.sectionFields.filter(field => field.required === true);
    },
    sectionRequiredFieldsCount() {
      return this.sectionRequiredFields.length;
    },
    sectionValidatedFields() {
      return this.sectionRequiredFields.filter(field => field.validated === true);
    },
    sectionValidatedFieldsCount() {
      return this.sectionValidatedFields.length;
    }
  },
  methods: {
    // here to be overrriden in individual components if needed
    beforeNextSection() {},
    checkSectionValidation() {
      this.$nextTick(() => {
        if (this.sectionHasMatchingFields && this.sectionMatches[0].value !== this.sectionTargets[0].value) {
          this.sectionMatches[0].setError(`Must match ${this.sectionTargets[0].humanName}`);
        }

        this.sectionValid = this.canSubmitSection;
      });
    },
    findComponents(startingComponent, componentArray, target) {
      if (startingComponent === undefined) {
        return componentArray;
      }

      if (startingComponent.$options._componentTag === target) {
        componentArray.push(startingComponent);
      }

      startingComponent.$children.forEach((childComponent) => {
        this.findComponents(childComponent, componentArray, target);
      });

      return componentArray;
    },
    findField(key) {
      return this.fields.find(field => field.field === key);
    },
    setSectionFields() {
      const sectionFields = [];

      this.sections.forEach((section) => {
        sectionFields.push(this.findComponents(section, [], 'legent-input'));
      });

      return sectionFields;
    },
    goToSection() {
      this.sections.forEach((section) => {
        section.isActive = false;
      });

      this.sections[this.currentSection].isActive = true;

      this.$nextTick(() => {
        if (!this.sectionFields[0].disabled) {
          this.sectionFields[0].setFocus();
        }
      });
    },
    handlePrevSection(e) {
      e.preventDefault();
      this.currentSection--;
      this.goToSection();
      this.handleSectionChange();
      this.handleScrollTop();
    },
    handleNextSection(e) {
      e.preventDefault();
      this.beforeNextSection();
      this.currentSection++;
      this.goToSection();
      this.handleSectionChange();
      this.handleScrollTop();
    },
    handleScrollTop() {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    },
    handleSectionChange() {
      this.sectionValid = this.sectionRequiredFieldsCount === this.sectionValidatedFieldsCount;
    }
  }
};

export {
  form,
  formSections
};
