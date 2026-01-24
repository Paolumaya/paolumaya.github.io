{
  description = "A development environment for testing Obsidian Quartz";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        # Quartz v4 requires Node v22+ and Git for history
        buildInputs = with pkgs; [
          nodejs_22
          git
        ];

        shellHook = ''
          echo "--- Quartz Testing Environment ---"
          echo "Node version: $(node --version)"
          echo "NPM version:  $(npm --version)"
          echo "Git version:  $(git --version)"
          echo "----------------------------------"
          echo "To initialize Quartz:  npx quartz create"
          echo "To serve locally:       npx quartz build --serve"
        '';
      };
    });
}
