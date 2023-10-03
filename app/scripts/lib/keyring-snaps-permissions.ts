import {
  SubjectType,
  SubjectMetadataController,
} from '@metamask/subject-metadata-controller';
import { KeyringRpcMethod } from '@metamask/keyring-api';

/**
 * This is the default list of keyring methods an origin can call.
 */
const allowedMethods: Record<SubjectType, string[]> = {
  [SubjectType.Extension]: [
    KeyringRpcMethod.ListAccounts,
    KeyringRpcMethod.GetAccount,
    KeyringRpcMethod.FilterAccountChains,
    KeyringRpcMethod.DeleteAccount,
    KeyringRpcMethod.ListRequests,
    KeyringRpcMethod.GetRequest,
    KeyringRpcMethod.SubmitRequest,
  ],
  [SubjectType.Website]: [
    KeyringRpcMethod.ListAccounts,
    KeyringRpcMethod.GetAccount,
    KeyringRpcMethod.CreateAccount,
    KeyringRpcMethod.FilterAccountChains,
    KeyringRpcMethod.ListRequests,
    KeyringRpcMethod.GetRequest,
    KeyringRpcMethod.ApproveRequest,
    KeyringRpcMethod.RejectRequest,
  ],
  [SubjectType.Internal]: [],
  [SubjectType.Unknown]: [],
  [SubjectType.Snap]: [],
};

/**
 * Builds a function that returns the list of keyring methods an origin can
 * call.
 *
 * @param controller - Reference to the `SubjectMetadataController`.
 * @returns A function that returns the list of keyring methods an origin can
 * call.
 */
export function keyringSnapPermissionsBuilder(
  controller: SubjectMetadataController,
): (origin: string) => string[] {
  return (origin: string) => {
    const metadata = controller.getSubjectMetadata(origin);
    return metadata?.subjectType
      ? allowedMethods[metadata.subjectType] ?? []
      : [];
  };
}
