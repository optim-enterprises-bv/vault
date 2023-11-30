{{!
  Copyright (c) HashiCorp, Inc.
~}}

<KvPageHeader @breadcrumbs={{@breadcrumbs}} @pageTitle="Create New Version">
  <:toolbarFilters>
    <Toggle
      @name="json"
      @status="success"
      @size="small"
      @checked={{or this.showJsonView this.secretDataIsAdvanced}}
      @onChange={{fn (mut this.showJsonView)}}
      @disabled={{this.secretDataIsAdvanced}}
    >
      <span class="has-text-grey">JSON</span>
    </Toggle>
  </:toolbarFilters>
</KvPageHeader>

{{#if this.showOldVersionAlert}}
  <Hds::Alert data-test-secret-version-alert @type="inline" @color="warning" class="has-top-bottom-margin" as |A|>
    <A.Title>Warning</A.Title>
    <A.Description>
      You are creating a new version based on data from Version
      {{@previousVersion}}. The current version for
      <code>{{@secret.path}}</code>
      is Version
      {{@currentVersion}}.
    </A.Description>
  </Hds::Alert>
{{/if}}
{{#if @noReadAccess}}
  <Hds::Alert data-test-secret-no-read-alert @type="inline" @color="warning" class="has-top-bottom-margin" as |A|>
    <A.Title>Warning</A.Title>
    <A.Description>
      You do not have read permissions for this secret data. Saving will overwrite the existing secret.
    </A.Description>
  </Hds::Alert>
{{/if}}

<form {{on "submit" (perform this.save)}}>
  <div class="box is-sideless is-fullwidth is-bottomless">
    <NamespaceReminder @mode="create" @noun="secret" />
    <MessageError @model={{@secret}} @errorMessage={{this.errorMessage}} />

    <KvDataFields
      @showJson={{or this.showJsonView this.secretDataIsAdvanced}}
      @secret={{@secret}}
      @modelValidations={{this.modelValidations}}
      @type="edit"
    />

    <div class="has-top-margin-m">
      <Toggle
        @name="Show diff"
        @status="success"
        @size="small"
        @onChange={{fn (mut this.showDiff)}}
        @checked={{this.showDiff}}
        @disabled={{not this.diffDelta}}
      >
        <span class="ttl-picker-label is-large">Show diff</span><br />
        <div class="description has-text-grey" data-test-diff-description>{{if
            this.diffDelta
            "Showing the diff will reveal secret values"
            "No changes to show. Update secret to view diff"
          }}</div>
        {{#if this.showDiff}}
          <div class="form-section visual-diff text-grey-lightest background-color-black has-top-margin-s">
            <pre data-test-visual-diff>{{sanitized-html this.visualDiff}}</pre>
          </div>
        {{/if}}
      </Toggle>
    </div>
  </div>
  <div class="box is-fullwidth is-bottomless">
    <div class="control">
      <button
        type="submit"
        class="button is-primary {{if this.save.isRunning 'is-loading'}}"
        disabled={{this.save.isRunning}}
        data-test-kv-save
      >
        Save
      </button>
      <button
        type="button"
        class="button has-left-margin-s"
        disabled={{this.save.isRunning}}
        {{on "click" this.onCancel}}
        data-test-kv-cancel
      >
        Cancel
      </button>
    </div>
    {{#if this.invalidFormAlert}}
      <AlertInline
        data-test-invalid-form-alert
        class="has-top-padding-s"
        @type="danger"
        @message={{this.invalidFormAlert}}
        @mimicRefresh={{true}}
      />
    {{/if}}
  </div>
</form>